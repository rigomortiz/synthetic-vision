(p, h) => {

  p.draw = () => {
    p.clear();
    p.lights();
    p.sphere(100);
    p.filter(p.BLUR, 3);
    p.textAlign(p.CENTER, p.CENTER);
    p.fill(250, 0, 0);
    p.text("SYNTHETIC VISION", 0, 0);
  };

  h.update = () => {
    p.redraw();
  };

  h.src(h.o0)
    .rotate(0.09, 0.01)
    .scale(0.8)
    .blend(h.src(h.o0).brightness(-0.02), 0.04)
    .layer(h.s0)
    .out(h.o0);
}