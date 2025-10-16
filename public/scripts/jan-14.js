(p, h, sv) => {
    h.src(h.s0)
        .color(1,2,4)
        .saturate(0.2)
        .luma(1.2,0.05)
        .modulate(h.noise(100), 0.3)
        .add(h.src(h.o0).scale(()=> p.log(h.time)), 2)
        .scale(3)
        .diff(h.src(h.s0).scale(0.7))
        .modulateScale(h.osc(2).modulateRotate(h.o0,.74))
        .diff(h.src(h.s0)
        .rotate(p.log(h.time))
        )
    .out(h.o0)

    h.render(h.o0);

}