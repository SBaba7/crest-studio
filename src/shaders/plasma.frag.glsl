precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uIntensity;
uniform vec2 uPointer;

// --- preamble ---
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 6; i++) {
    value += amplitude * noise(p * frequency);
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

vec2 domainWarp(vec2 p) {
  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0)),
    fbm(p + vec2(5.2, 1.3))
  );
  vec2 r = vec2(
    fbm(p + 4.0 * q + vec2(1.7, 9.2)),
    fbm(p + 4.0 * q + vec2(8.3, 2.8))
  );
  return p + 0.15 * r;
}

// --- Plasma body ---
float plasma(vec2 uv, float time) {
  vec2 p = domainWarp(uv * 0.08 + time * 0.04);

  float sx = sin(p.x * 3.0 + time * 0.7);
  float sy = sin(p.y * 3.0 + time * 0.55);
  float ss = sin((p.x + p.y) * 2.5 + time * 0.45);
  float sd = sin(length(p - vec2(0.3, -0.2)) * 4.0 + time * 0.6);

  float sum = sx + sy + ss + sd;
  return sin(sum * 1.2);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);

  float pointerDist = length(uv - (uPointer - 0.5) * vec2(uResolution.x / min(uResolution.x, uResolution.y), uResolution.y / min(uResolution.x, uResolution.y)));
  float pointerBoost = exp(-pointerDist * 3.5) * uIntensity;

  float t = uTime;
  float field = plasma(uv, t);

  float bands = field * 0.5 + 0.5;
  bands += pointerBoost * 0.35;
  bands = clamp(bands, 0.0, 1.0);

  // Purple palette
  vec3 deep    = vec3(0.12, 0.06, 0.22);
  vec3 mid     = vec3(0.35, 0.15, 0.55);
  vec3 bright  = vec3(0.62, 0.35, 0.85);
  vec3 glow    = vec3(0.82, 0.65, 0.98);

  vec3 col = mix(deep, mid, smoothstep(0.0, 0.4, bands));
  col = mix(col, bright, smoothstep(0.35, 0.7, bands));
  col = mix(col, glow, smoothstep(0.65, 1.0, bands));

  col += pointerBoost * vec3(0.15, 0.08, 0.25);

  gl_FragColor = vec4(col, 1.0);
}
