precision highp float;

#define SLOW_TIME 5.0
#define ZOOM_DEBUG true

uniform vec2 iResolution; // canvas size
uniform float iTime;      // time in seconds

const float sq3 = 1.7320508075688772; // sqrt(3.0)

int isOnSierpinski(vec2 point, float prec, int iterations, float width) {
  float b = width;
  vec2 pos1 = vec2(0.0, 0.0);
  vec2 pos2 = vec2(b, 0.0);
  vec2 pos3 = vec2(b / 2.0, sq3 * b / 2.0);


  for (int i = 0; i < 30; i++) { // Max 30 for GLSL loop
    if (i >= iterations) break;

    if (length(pos1 - point) < prec) {
      return 1;
    }
    if (length(pos2 - point) < prec) {
      return 2;
    }
    if (length(pos3 - point) < prec) {
      return 3;
    }

    b = b / 2.0;

    vec2 mid1 = (pos1 + pos2) / 2.0;
    vec2 mid2 = (pos2 + pos3) / 2.0;
    vec2 mid3 = (pos3 + pos1) / 2.0;

    float d1 = length(point - pos1);
    float d2 = length(point - pos2);
    float d3 = length(point - pos3);

    if (d1 < d2 && d1 < d3) {
      pos2 = mid1;
      pos3 = mid3;
    } else if (d2 < d1 && d2 < d3) {
      pos1 = mid1;
      pos3 = mid2;
    } else {
      pos1 = mid3;
      pos2 = mid2;
    }
  }
  return 0;
}

void main() {
  float width = iResolution.x;
  float height = iResolution.y;
  if (height > width * sq3 / 2.0) {
    width = height * 2.0 / sq3;
  }

  float time = iTime;
  int iterations = int(max(5.0, min(15.0, log2(max(width, height)) * 3.0)));
  float zeroToOne = pow(mod(time / SLOW_TIME, 1.0), 1.25);

  vec2 fragCoord = gl_FragCoord.xy;
  float nwidth = width * (1.0 + zeroToOne);
  float prec = 0.5;
  int res = isOnSierpinski(fragCoord, prec, iterations, nwidth);

  vec3 color;
  if (res != 0) {
    color = vec3(res == 1 ? 1.0 : 0.0, res == 2 ? 1.0 : 0.0, res == 3 ? 1.0 : 0.0);
  } else {
    color = vec3(0.0);
  }
  gl_FragColor = vec4(color, 1.0);
}