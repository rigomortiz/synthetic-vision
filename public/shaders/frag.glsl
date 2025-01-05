#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D texture;
uniform float u_time;

varying vec2 vTexCoord;

void main() {
  vec2 uv = vTexCoord;
  vec4 col = texture2D(texture, uv);

  // Efecto de noise sutil
  float noise = fract(tan(dot(uv * vec2(100.0, 100.0), vec2(12.9898, 78.233) * u_time)) * 43758.5453);
  float noiseIntensity = 0.01 * noise; // Intensidad del ruido muy baja

  // Patrones sutiles
  float pattern = tan(uv.x * 100.0 + u_time) * tan(uv.y * 100.0 + u_time);
  float patternIntensity = 0.005 * pattern;

  // Combine noise y patrones
  float finalIntensity = noiseIntensity + patternIntensity;

  // Aplica una variación sutil en el negro
  col.rgb += vec3(finalIntensity);

  gl_FragColor = col;
}