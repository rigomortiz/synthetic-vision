(p, h, sv) => {

    h.src(h.s0).color(1,.5,.2)
        .scale(1.05)
        .add(h.src(h.o0)
             .color(-1,1,-1)
             .brightness(-.9), .7)
        .add(h.s0)
      .diff(h.osc(.1000, 10, 1.5))
        .modulateScale(h.noise(10), .01)

        .out()

    h.render(h.o0)
}