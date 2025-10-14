(p, h, sv) => {
    h.osc(3, -0.3, -0.003)
        .kaleid(3)
        .color(3, 3, 3)
        .colorama(0.3)
        .rotate(0.003,()=>Math.cos(h.time)* -0.003 )
        .modulateRotate(h.o0,()=>Math.cos(h.time) * 0.003)
        .modulate(h.o0, 0.3)
        .add(h.s0)
        .scale(3)
        .brightness(0)
        .color(.3, .3, .3).colorama(.02)
        .scale(0.3)
        .out(h.o0)

    h.render(h.o0);

}