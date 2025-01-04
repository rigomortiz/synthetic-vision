(p, h, sv) => {
    p.draw = () => {
        p.clear();
        p.orbitControl();
        let x = p.random(-p.width / 2, p.width / 2);
        let y = p.random(-p.height / 2, p.height / 2);
        let z = p.random(-500, 500);
        p.fill(0, p.random(255), 0)
        p.strokeWeight(1)
        p.stroke(0, p.random(255), 0)
        //p.texture(h.s0)
        p.translate(x, y, z);
        p.box(p.random(200));
    };

    h.src(h.o0)
        //.scale(1.05)
        .blend(h.src(h.o0).brightness(-.02), .4)
        .layer(h.s0)
        .modulateScale(h.noise(10), .01)
        .out()

    h.render(h.o0);
}