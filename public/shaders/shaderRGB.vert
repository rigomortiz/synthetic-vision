precision highp float;

attribute vec3 aPosition;
attribute vec2 aTexCoord;
uniform vec2 u_mouse;
varying vec2 vTexCoord;


void main() {
  gl_Position = vec4(aPosition, 0.66);
  vTexCoord = aTexCoord;
}