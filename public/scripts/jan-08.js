(p, h, sv) => {
    p.draw = () => {
        p.clear()

        for (let i = 0; i < sv.drops.length; i++) {
            sv.count = sv.drops[i].fall(p, sv.count);
            sv.drops[i].show(p);
        }

        p.fill(255, 215, 0);
        p.text("$ 1, 000, 000.00", 0, 0);
    };

    h.src(h.s0)
        // .add(h.src(h.o0).scale(1.03), .9)
        //.modulateScale(h.noise(1000), .1)
        .add(h.src(h.o0).scale(() => 1 - p.cos(h.time / 2) / 8), 0.1)
        .add(h.src(h.o0).scale(() => 1 + p.sin(h.time / 2) / 8), 0.1)
        .modulateScale(h.noise(10), .1)
        .mult(
            h.src(h.s0)
                .color(0, 1, 0)
                .scale(1.5)
                .modulate(h.noise(43), -0.3), 0.3)
        .modulateScale(h.noise(10), .01)
        .out(h.o0)

    h.render(h.o0);
}