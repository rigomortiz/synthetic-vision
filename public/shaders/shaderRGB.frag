precision highp float;

uniform sampler2D tex0;
varying vec2 vTexCoord;

vec2 zoom(vec2 coord, float amount) {
  vec2 relativeToCenter = coord - 0.6;
  relativeToCenter /= amount; // Zoom in
  return relativeToCenter + 0.6; // Put back into absolute coordinates
}

void main() {
  // Get each color channel using coordinates with different amounts
  // of zooms to displace the colors slightly
  gl_FragColor = vec4(
    texture2D(tex0, vTexCoord).r,
    texture2D(tex0, zoom(vTexCoord, 1.15)).g,
    texture2D(tex0, zoom(vTexCoord, 1.3)).b,
    texture2D(tex0, vTexCoord).a
  );
}