struct Params {
    sizes: vec4u,
    kernel: vec4f,
    counts: vec4u,
    weights: array<vec4f, 256>,
}
@group(0) @binding(0) var source: texture_2d<f32>;
@group(0) @binding(1) var<uniform> p: Params;
@vertex fn vertex_main(@builtin(vertex_index) index: u32) -> @builtin(position) vec4f {
    var positions = array<vec2f, 3>(vec2f(-1, -1), vec2f(3, -1), vec2f(-1, 3));
    return vec4f(positions[index], 0, 1);
}
fn bilinear(point: vec2f) -> vec4f {
    let pos = clamp(point, vec2f(0), vec2f(p.sizes.xy) - vec2f(1));
    let lo = vec2i(floor(pos));
    let hi = min(lo + vec2i(1), vec2i(p.sizes.xy) - vec2i(1));
    let f = fract(pos);
    return mix(mix(textureLoad(source, lo, 0), textureLoad(source, vec2i(hi.x,lo.y),0), f.x),
               mix(textureLoad(source, vec2i(lo.x,hi.y),0),textureLoad(source, hi,0), f.x), f.y);
}
fn encoded(point: vec2f) -> vec4f {
    let value = bilinear(point);
    return vec4f(pow(value.rgb, vec3f(p.kernel.y)), value.a);
}
@fragment fn gaussian(@builtin(position) pixel: vec4f) -> @location(0) vec4f {
    let center = pixel.xy * vec2f(p.sizes.xy) / vec2f(p.sizes.zw) - vec2f(0.5);
    var color = encoded(center);
    var sum = 1.0;
    for (var i=0u; i<p.counts.x; i+=1u) {
        let weight = p.weights[i/4u][i%4u];
        let distance = f32(i+1u) * p.kernel.x;
        let delta = select(vec2f(distance,0),vec2f(0,distance),p.kernel.z>0.5);
        for (var side=0u; side<2u; side+=1u) {
            let point = center + select(-delta,delta,side==1u);
            let valid = all(point >= vec2f(-0.5)) && all(point <= vec2f(p.sizes.xy)-vec2f(0.5));
            if valid || p.kernel.w == 1.0 { color += weight * encoded(point); sum += weight; }
            else if p.kernel.w == 2.0 { sum += weight; }
        }
    }
    let value = color / sum;
    let decoded = vec4f(pow(value.rgb, vec3f(1.0/p.kernel.y)),value.a);
    return floor(clamp(decoded,vec4f(0),vec4f(1))*255.0+vec4f(0.5))/255.0;
}
