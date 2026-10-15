/** shiki-core: restored from shiki-core-BRe5JeN_.js. */
import type { Dynamic } from "../interop/legacy-dynamic";
import { createJavaScriptRegexEngine } from "@shikijs/engine-javascript";
import { createBundledHighlighter, createSingletonShorthands, guessEmbeddedLanguages } from "@shikijs/core";
import { createLiveModuleNamespace } from "../boot/module-runtime";
import { preloadModule } from "../boot/preload";
import * as grammars from "./langs";
import { vitesseDark, vitesseLight } from "./themes";
import "../markdown/hast";
var batGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.batGrammars,
});
var cGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.cGrammars,
});
var csharpGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.csharpGrammars,
});
var cssGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.cssGrammars,
});
var csvGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.csvGrammars,
});
var dartGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.dartGrammars,
});
var diffGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.diffGrammars,
});
var dockerGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.dockerGrammars,
});
var elixirGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.elixirGrammars,
});
var goGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.goGrammars,
});
var graphqlGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.graphqlGrammars,
});
var haskellGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.haskellGrammars,
});
var hclGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.hclGrammars,
});
var htmlGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.htmlGrammars,
});
var iniGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.iniGrammars,
});
var javaGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.javaGrammars,
});
var javascriptGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.javascriptGrammars,
});
var jsonGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.jsonGrammars,
});
var json5GrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.json5Grammars,
});
var jsoncGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.jsoncGrammars,
});
var jsonlGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.jsonlGrammars,
});
var jsxGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.jsxGrammars,
});
var kotlinGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.kotlinGrammars,
});
var latexGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.latexGrammars,
});
var lessGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.lessGrammars,
});
var luaGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.luaGrammars,
});
var makeGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.makeGrammars,
});
var markdownGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.markdownGrammars,
});
var perlGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.perlGrammars,
});
var phpGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.phpGrammars,
});
var plsqlGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.plsqlGrammars,
});
var powershellGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.powershellGrammars,
});
var protoGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.protoGrammars,
});
var pythonGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.pythonGrammars,
});
var rGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.rGrammars,
});
var regexpGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.regexpGrammars,
});
var rustGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.rustGrammars,
});
var sassGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.sassGrammars,
});
var scalaGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.scalaGrammars,
});
var scssGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.scssGrammars,
});
var shellscriptGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.shellscriptGrammars,
});
var shellsessionGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.shellsessionGrammars,
});
var sqlGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.sqlGrammars,
});
var svelteGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.svelteGrammars,
});
var swiftGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.swiftGrammars,
});
var terraformGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.terraformGrammars,
});
var texGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.texGrammars,
});
var tomlGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.tomlGrammars,
});
var tsvGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.tsvGrammars,
});
var tsxGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.tsxGrammars,
});
var typescriptGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.typescriptGrammars,
});
var vueGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.vueGrammars,
});
var xmlGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.xmlGrammars,
});
var yamlGrammarsModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => grammars.yamlGrammars,
});
var vitesseDarkModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => vitesseDark,
});
var vitesseLightModule: Dynamic = createLiveModuleNamespace({
  default: (..._extraArguments: unknown[]): Dynamic => vitesseLight,
});
var createLanguageLoader: Dynamic = (
  input?: Dynamic,
  options?: Dynamic,
  context?: Dynamic,
  value?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic =>
  value
    ? {
        id: input,
        name: options,
        aliases: [...value],
        import: context,
      }
    : {
        id: input,
        name: options,
        import: context,
      };
var bundledLanguageInfos: Dynamic = [
  createLanguageLoader(
    `javascript`,
    `JavaScript`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic =>
              javascriptGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`js`, `cjs`, `mjs`],
  ),
  createLanguageLoader(
    `typescript`,
    `TypeScript`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic =>
              typescriptGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`ts`, `cts`, `mts`],
  ),
  createLanguageLoader(
    `jsx`,
    `JSX`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => jsxGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `tsx`,
    `TSX`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => tsxGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `html`,
    `HTML`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => htmlGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `css`,
    `CSS`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => cssGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `json`,
    `JSON`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => jsonGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `jsonc`,
    `JSON with Comments`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => jsoncGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `graphql`,
    `GraphQL`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => graphqlGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`gql`],
  ),
  createLanguageLoader(
    `markdown`,
    `Markdown`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => markdownGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`md`],
  ),
  createLanguageLoader(
    `python`,
    `Python`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => pythonGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`py`],
  ),
  createLanguageLoader(
    `shellscript`,
    `Shell`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic =>
              shellscriptGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`bash`, `sh`, `shell`, `zsh`],
  ),
  createLanguageLoader(
    `shellsession`,
    `Shell Session`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic =>
              shellsessionGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`console`],
  ),
  createLanguageLoader(
    `powershell`,
    `PowerShell`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic =>
              powershellGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`ps`, `ps1`],
  ),
  createLanguageLoader(
    `sql`,
    `SQL`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => sqlGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `yaml`,
    `YAML`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => yamlGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`yml`],
  ),
  createLanguageLoader(
    `toml`,
    `TOML`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => tomlGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `ini`,
    `INI`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => iniGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`properties`],
  ),
  createLanguageLoader(
    `csv`,
    `CSV`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => csvGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `xml`,
    `XML`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => xmlGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `diff`,
    `Diff`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => diffGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `docker`,
    `Dockerfile`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => dockerGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`dockerfile`],
  ),
  createLanguageLoader(
    `make`,
    `Makefile`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => makeGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`makefile`],
  ),
  createLanguageLoader(
    `regexp`,
    `RegExp`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => regexpGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`regex`],
  ),
  createLanguageLoader(
    `proto`,
    `Protocol Buffer 3`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => protoGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`protobuf`],
  ),
  createLanguageLoader(
    `hcl`,
    `HashiCorp HCL`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => hclGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `terraform`,
    `Terraform`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => terraformGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`tf`, `tfvars`],
  ),
  createLanguageLoader(
    `go`,
    `Go`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => goGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `rust`,
    `Rust`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => rustGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`rs`],
  ),
  createLanguageLoader(
    `java`,
    `Java`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => javaGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `kotlin`,
    `Kotlin`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => kotlinGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`kt`, `kts`],
  ),
  createLanguageLoader(
    `c`,
    `C`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => cGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `csharp`,
    `C#`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => csharpGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`c#`, `cs`],
  ),
  createLanguageLoader(
    `swift`,
    `Swift`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => swiftGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `php`,
    `PHP`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => phpGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `vue`,
    `Vue`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => vueGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `svelte`,
    `Svelte`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => svelteGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `scss`,
    `SCSS`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => scssGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `sass`,
    `Sass`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => sassGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `less`,
    `Less`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => lessGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `json5`,
    `JSON5`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => json5GrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `jsonl`,
    `JSON Lines`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => jsonlGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `tsv`,
    `TSV`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => tsvGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `bat`,
    `Batch File`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => batGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`batch`],
  ),
  createLanguageLoader(
    `latex`,
    `LaTeX`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => latexGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `tex`,
    `TeX`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => texGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `r`,
    `R`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => rGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `scala`,
    `Scala`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => scalaGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `dart`,
    `Dart`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => dartGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `lua`,
    `Lua`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => luaGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `perl`,
    `Perl`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => perlGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `haskell`,
    `Haskell`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => haskellGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
    [`hs`],
  ),
  createLanguageLoader(
    `elixir`,
    `Elixir`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => elixirGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
  createLanguageLoader(
    `plsql`,
    `PL/SQL`,
    (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => plsqlGrammarsModule,
          ),
        undefined,
        import.meta.url,
      ),
  ),
];
var plainLanguageAliases: Dynamic = new (Set as Dynamic)([
  ``,
  `text`,
  `txt`,
  `plain`,
  `plaintext`,
  `none`,
  `ansi`,
]);
function isPlainLanguage(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return plainLanguageAliases.has(input.trim().toLowerCase());
}
var bundledThemeInfos: Dynamic = [
  {
    id: `vitesse-light`,
    displayName: `Vitesse Light`,
    type: `light`,
    import: (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => vitesseLightModule,
          ),
        undefined,
        import.meta.url,
      ),
  },
  {
    id: `vitesse-dark`,
    displayName: `Vitesse Dark`,
    type: `dark`,
    import: (..._extraArguments: unknown[]): Dynamic =>
      preloadModule(
        (..._extraArguments: unknown[]): Dynamic =>
          Promise.resolve().then(
            (..._extraArguments: unknown[]): Dynamic => vitesseDarkModule,
          ),
        undefined,
        import.meta.url,
      ),
  },
];
var languageAliasEntries: Dynamic = bundledLanguageInfos.flatMap(
  (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic =>
    [input.id]
      .concat(input.aliases ?? [])
      .map(
        (input2?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
          input2,
          input,
        ],
      ),
);
var bundledLanguages: Dynamic = Object.fromEntries(
  languageAliasEntries.map(
    ([input, input2]: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
      input,
      input2.import,
    ],
  ),
);
var bundledThemes: Dynamic = Object.fromEntries(
  bundledThemeInfos.map(
    (input?: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
      input.id,
      input.import,
    ],
  ),
);
var canonicalLanguageByAlias: Dynamic = new (Map as Dynamic)(
  languageAliasEntries.map(
    ([input, input2]: Dynamic, ..._extraArguments: unknown[]): Dynamic => [
      input,
      input2.id,
    ],
  ),
);
function canonicalLanguage(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return canonicalLanguageByAlias.get(input.trim().toLowerCase());
}
var codeHighlighter: Dynamic = createSingletonShorthands(
  createBundledHighlighter({
    langs: bundledLanguages,
    themes: bundledThemes,
    engine: (..._extraArguments: unknown[]): Dynamic =>
      createJavaScriptRegexEngine({
        forgiving: true,
      }),
  }),
  {
    guessEmbeddedLanguages: guessEmbeddedLanguages,
  },
);
var {
  codeToTokens: codeToTokens,
  getSingletonHighlighter: getSingletonHighlighter,
}: Dynamic = codeHighlighter;
function codeToHtml(
  input?: Dynamic,
  options?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic {
  return codeHighlighter.codeToHtml(input, {
    ...options,
    lang: canonicalLanguage(options.lang) ?? `text`,
  });
}
var codePluginModule: Dynamic = createLiveModuleNamespace({
  CODE_THEMES: (..._extraArguments: unknown[]): Dynamic => CODE_THEMES,
  SLOW_TOKENIZE_MS: (..._extraArguments: unknown[]) => 450,
  code: (..._extraArguments: unknown[]): Dynamic => code,
  createCodePlugin: (..._extraArguments: unknown[]): Dynamic =>
    createCodePlugin,
  setCodeLangMissListener: (..._extraArguments: unknown[]): Dynamic =>
    setCodeLangMissListener,
});
var CODE_THEMES: Dynamic = [`vitesse-light`, `vitesse-dark`];
var MAX_TOKEN_CACHE_ENTRIES: number = 256;
var themeCacheName: Dynamic = (
  input?: Dynamic,
  ..._extraArguments: unknown[]
): Dynamic => (typeof input == `string` ? input : (input.name ?? `custom`));
var codeLanguageMissListener: Dynamic = null;
function setCodeLangMissListener(
  input?: Dynamic,
  ..._extraArguments: unknown[]
): undefined {
  codeLanguageMissListener = input;
}
function createCodePlugin(
  input: Dynamic = CODE_THEMES,
  options: Dynamic = {},
  ..._extraArguments: unknown[]
): Dynamic {
  let value: Dynamic = options.slowMs ?? 450;
  let value2: Dynamic =
    options.now ??
    ((..._extraArguments: unknown[]): number => performance.now());
  let entries: Dynamic = new (Map as Dynamic)();
  let entries2: Dynamic = new (Map as Dynamic)();
  let value3 = (
    input2?: Dynamic,
    options2?: Dynamic,
    ..._extraArguments: unknown[]
  ): undefined => {
    entries.set(input2, options2);
    if (entries.size > MAX_TOKEN_CACHE_ENTRIES) {
      entries.delete(entries.keys().next().value);
    }
  };
  return {
    name: `shiki`,
    type: `code-highlighter`,
    getThemes: (..._extraArguments: unknown[]): Dynamic => input,
    getSupportedLanguages: (..._extraArguments: unknown[]): Dynamic =>
      Object.keys(bundledLanguages),
    supportsLanguage: (input2?: Dynamic, ..._extraArguments: unknown[]) =>
      canonicalLanguage(input2 ?? ``) !== undefined,
    highlight(
      { code: input2, language: input3, themes: input4 }: Dynamic,
      options2?: Dynamic,
      ..._extraArguments: unknown[]
    ): Dynamic {
      let value5: Dynamic = input3 ?? ``;
      let value6: Dynamic = canonicalLanguage(value5);
      if (value6 === undefined && !isPlainLanguage(value5)) {
        codeLanguageMissListener?.(value5);
      }
      let value7: Dynamic = value6 ?? `text`;
      let value8: string = `${value7}\0${themeCacheName(input4[0])}\0${themeCacheName(input4[1])}\0${input2}`;
      let entry: Dynamic = entries.get(value8);
      if (entry) return entry;
      let entry2: Dynamic = entries2.get(value8);
      return entry2
        ? (options2 && entry2.add(options2), null)
        : (entries2.set(
            value8,
            new (Set as Dynamic)(options2 ? [options2] : []),
          ),
          value4(value8, input2, value7, input4),
          null);
    },
  };
  async function value4(
    input2?: Dynamic,
    options2?: Dynamic,
    context?: Dynamic,
    value5?: Dynamic,
    ..._extraArguments: unknown[]
  ): Promise<undefined> {
    let value6: Dynamic;
    let value7: Dynamic;
    try {
      let value8: Dynamic = await getSingletonHighlighter({
        themes: value5,
        langs: context === `text` ? [] : [context],
      });
      let value9: Dynamic = value2();
      value6 = value8.codeToTokens(options2, {
        lang: context,
        themes: {
          light: value5[0],
          dark: value5[1],
        },
      });
      value7 = value2() - value9;
    } catch {
      entries2.delete(input2);
      return;
    }
    if (value7 <= value) {
      value3(input2, value6);
    }
    let entry: Dynamic = entries2.get(input2);
    entries2.delete(input2);
    if (entry) for (let value8 of entry as Dynamic) value8(value6);
  }
}
var code: Dynamic = createCodePlugin();
export { codeToHtml as n, codePluginModule as t };
export { codeToHtml, codePluginModule };
