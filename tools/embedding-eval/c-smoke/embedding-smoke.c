// Minimal C smoke test for the LiteRT-LM C embedding API (litert-lm v0.18.0).
//
// Mirrors the call sequence a Rust FFI wrapper would use, against the
// CLiteRTLM_mac.xcframework dylib (not the Python wheel's library):
//
//   settings_create(model, backend, NULL, NULL)
//   [settings_set_cache_dir]           -- directory must already exist
//   [settings_set_activation_data_type]
//   engine_create(settings); settings_delete(settings)
//   options_create()                   -- defaults: normalize=1, special tokens=1
//   [options_set_output_size]
//   input_data_create(TEXT, utf8, len) -- bytes are copied; no NUL needed
//   compute_embedding_batch(engine, inputs[][], counts[], n, options)
//   responses_get_at / response_get_size / response_get_values
//   responses_delete; input_data_delete; options_delete; engine_delete
//
// Usage:
//   embedding-smoke <model.litertlm> <cpu|gpu> <default|fp32|fp16> <output_size|0>
//                   <cache_dir|-> <inputs.txt> <out.f32> [batch]
// inputs.txt: one UTF-8 input per line (already prefixed). out.f32: raw
// little-endian float32, n * dim values. Prints dim and timings to stdout.

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#include "embedding_engine.h"
#include "error_reporter.h"

static double now_ms(void) {
  struct timespec ts;
  clock_gettime(CLOCK_MONOTONIC, &ts);
  return ts.tv_sec * 1000.0 + ts.tv_nsec / 1e6;
}

static void die(const char* what) {
  const char* msg = litert_lm_get_last_error_message();
  fprintf(stderr, "FAILED: %s: code=%d msg=%s\n", what,
          litert_lm_get_last_error_code(), msg ? msg : "(null)");
  exit(2);
}

int main(int argc, char** argv) {
  if (argc < 8) {
    fprintf(stderr, "usage: %s model backend activation output_size cache_dir inputs out [batch]\n",
            argv[0]);
    return 1;
  }
  const char* model = argv[1];
  const char* backend = argv[2];
  const char* activation = argv[3];
  int output_size = atoi(argv[4]);
  const char* cache_dir = argv[5];
  const char* in_path = argv[6];
  const char* out_path = argv[7];
  int batch = argc > 8 ? atoi(argv[8]) : 16;

  litert_lm_set_min_log_level(kLiteRtLmLogSeverityError);

  // Read inputs.
  FILE* f = fopen(in_path, "rb");
  if (!f) { perror("inputs"); return 1; }
  size_t cap = 1024, n = 0;
  char** lines = malloc(cap * sizeof(char*));
  char* line = NULL;
  size_t lcap = 0;
  ssize_t len;
  while ((len = getline(&line, &lcap, f)) > 0) {
    if (line[len - 1] == '\n') line[--len] = 0;
    if (n == cap) { cap *= 2; lines = realloc(lines, cap * sizeof(char*)); }
    lines[n++] = strdup(line);
  }
  fclose(f);

  double t0 = now_ms();
  LiteRtLmEmbeddingEngineSettings* settings =
      litert_lm_embedding_engine_settings_create(model, backend, NULL, NULL);
  if (!settings) die("settings_create");
  if (strcmp(cache_dir, "-") != 0)
    litert_lm_embedding_engine_settings_set_cache_dir(settings, cache_dir);
  if (strcmp(activation, "fp32") == 0)
    litert_lm_embedding_engine_settings_set_activation_data_type(
        settings, kLiteRtLmActivationDataTypeFloat32);
  else if (strcmp(activation, "fp16") == 0)
    litert_lm_embedding_engine_settings_set_activation_data_type(
        settings, kLiteRtLmActivationDataTypeFloat16);
  LiteRtLmEmbeddingEngine* engine = litert_lm_embedding_engine_create(settings);
  litert_lm_embedding_engine_settings_delete(settings);
  if (!engine) die("engine_create");
  double t_create = now_ms() - t0;

  LiteRtLmEmbeddingOptions* opts = litert_lm_embedding_options_create();
  if (!opts) die("options_create");
  if (output_size > 0) litert_lm_embedding_options_set_output_size(opts, output_size);
  printf("defaults: normalize=%d insert_special_tokens=%d overflow=%d output_size=%d\n",
         litert_lm_embedding_options_get_normalize(opts),
         litert_lm_embedding_options_get_insert_special_tokens(opts),
         (int)litert_lm_embedding_options_get_input_overflow_strategy(opts),
         litert_lm_embedding_options_get_output_size(opts));

  FILE* out = fopen(out_path, "wb");
  if (!out) { perror("out"); return 1; }
  size_t dim = 0;
  double t1 = now_ms();
  for (size_t start = 0; start < n; start += batch) {
    size_t b = n - start < (size_t)batch ? n - start : (size_t)batch;
    LiteRtLmInputData** items = calloc(b, sizeof(LiteRtLmInputData*));
    const LiteRtLmInputData*** reqs = calloc(b, sizeof(LiteRtLmInputData**));
    size_t* counts = calloc(b, sizeof(size_t));
    for (size_t i = 0; i < b; i++) {
      const char* s = lines[start + i];
      items[i] = litert_lm_input_data_create(kLiteRtLmInputDataTypeText, s, strlen(s));
      if (!items[i]) die("input_data_create");
      reqs[i] = (const LiteRtLmInputData**)&items[i];  // one input per request
      counts[i] = 1;
    }
    LiteRtLmEmbeddingResponses* rs = litert_lm_embedding_engine_compute_embedding_batch(
        engine, (const LiteRtLmInputData* const* const*)reqs, counts, b, opts);
    if (!rs) die("compute_embedding_batch");
    size_t got = litert_lm_embedding_responses_get_size(rs);
    if (got != b) { fprintf(stderr, "batch size mismatch %zu != %zu\n", got, b); return 3; }
    for (size_t i = 0; i < got; i++) {
      const LiteRtLmEmbeddingResponse* r = litert_lm_embedding_responses_get_at(rs, i);
      size_t d = litert_lm_embedding_response_get_size(r);
      const float* v = litert_lm_embedding_response_get_values(r);
      if (!v) die("response_get_values");
      if (dim == 0) dim = d;
      if (d != dim) { fprintf(stderr, "dim changed %zu != %zu\n", d, dim); return 3; }
      fwrite(v, sizeof(float), d, out);
    }
    litert_lm_embedding_responses_delete(rs);
    for (size_t i = 0; i < b; i++) litert_lm_input_data_delete(items[i]);
    free(items); free(reqs); free(counts);
  }
  double t_embed = now_ms() - t1;
  fclose(out);

  // Single-call path on the first input, for the record.
  LiteRtLmInputData* one = litert_lm_input_data_create(kLiteRtLmInputDataTypeText, lines[0],
                                                       strlen(lines[0]));
  const LiteRtLmInputData* one_arr[1] = {one};
  LiteRtLmEmbeddingResponse* r1 = litert_lm_embedding_engine_compute_embedding(engine, one_arr, 1, opts);
  if (!r1) die("compute_embedding");
  printf("single first5: %f %f %f %f %f\n", litert_lm_embedding_response_get_values(r1)[0],
         litert_lm_embedding_response_get_values(r1)[1], litert_lm_embedding_response_get_values(r1)[2],
         litert_lm_embedding_response_get_values(r1)[3], litert_lm_embedding_response_get_values(r1)[4]);
  litert_lm_embedding_response_delete(r1);
  litert_lm_input_data_delete(one);

  // Error path: an empty model path must fail cleanly with a message.
  LiteRtLmEmbeddingEngineSettings* bad =
      litert_lm_embedding_engine_settings_create("/nonexistent.litertlm", backend, NULL, NULL);
  LiteRtLmEmbeddingEngine* bad_engine = bad ? litert_lm_embedding_engine_create(bad) : NULL;
  if (bad) litert_lm_embedding_engine_settings_delete(bad);
  const char* bad_msg = litert_lm_get_last_error_message();
  printf("bad-model engine=%p last_error=%.160s\n", (void*)bad_engine, bad_msg ? bad_msg : "(null)");
  if (bad_engine) litert_lm_embedding_engine_delete(bad_engine);

  litert_lm_embedding_options_delete(opts);
  litert_lm_embedding_engine_delete(engine);
  for (size_t i = 0; i < n; i++) free(lines[i]);
  free(lines);
  free(line);
  printf("n=%zu dim=%zu create_ms=%.1f embed_ms=%.1f per_text_ms=%.2f\n", n, dim, t_create,
         t_embed, t_embed / (double)n);
  return 0;
}
