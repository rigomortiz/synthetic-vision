(p, h, sv) => {
    p.draw = () => {
		p.clear();
		sv.drawBackground(p);
		sv.chip1.draw(p);
        sv.chip2.draw(p);
		sv.drawNodes(p);
    };

    h.src(h.s0)
        .scale(1.05)
        .mult(h.osc(0.1,0.1,()=>Math.tan(h.time)).saturate(100).kaleid(100))
        .modulate(h.o0,0.001)
        .add(h.o0,0.001)
        .modulate(h.noise( () => Math.tan(h.time),() => Math.tan(h.time)), 0.001)
        .blend(h.src(h.o0).brightness(-.02), .4)
        .layer(h.s0)
        .modulateScale(h.noise(10), .01)
    .out(h.o0)

    h.render(h.o0);
}