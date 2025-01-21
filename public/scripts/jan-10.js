(p, h, sv) => {
    p.draw = () => {
        p.clear()
        p.orbitControl()
        p.lights();
        for (let j = 0; j < p.TAU; j += p.TAU / 10) {
            let c = p.map(j, 0, p.TAU - j, 0, 255);
            p.rotateY(p.frameCount / 100 + p.TAU * j);
            p.rotateX(p.frameCount / 200 + p.TAU * j);
            p.fill(c)
            //p.fill(0, c, 0, c);
            p.box(p.TAU * 10);
            for (let i = 0; i < p.TAU; i += p.TAU / 1000) {
                let x = p.cos(i) * p.TAU;
                let y = p.sin(i) * p.TAU;
                p.translate(x, y, 0)
                p.torus(p.TAU, p.TAU / 10)
            }
        }
    };

    h.src(h.s0)
        .mult(h.osc(p.TAU, p.TAU / 10, () => Math.tan(h.time) * p.TAU)
            .saturate(p.TAU)
            .kaleid(p.TAU * 10))
        .modulate(h.o0, p.TAU / 10)
        .add(h.o0, p.TAU / 10)
        //.scale(p.TAU*10)
        .modulate(h.voronoi(p.TAU), p.TAU / 1000)
        .modulateScale(h.noise(p.TAU * 10), p.TAU / 10)
        .out()

    h.render(h.o0);

}