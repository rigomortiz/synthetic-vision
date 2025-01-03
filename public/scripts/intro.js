(p, h, sv) => {
    h.update = () => {
        p.redraw();
    }
    p.draw = () => {
        p.clear();
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont(sv.font("Volunmo"));
        p.fill("#FFFFFF");
        p.textSize(200);
        p.text("Synthetic Vision", 0, 0);
        p.textSize(48);
        p.textFont(sv.font("Terminus"));
        p.fill("#FFFFFF");
        p.text("PRESS ENTER", 0, 200);

        if (p.frameCount % 60 < 30) {
            p.textSize(48);
            p.textFont(sv.font("Terminus"));
            p.fill("#FFFF00");
            p.text("PRESS ENTER", 0, 200);
        }

        let radius = p.map(sv.amplitude.getLevel(), 0, 1, 10, 200);
        let red = p.map(sv.amplitude.getLevel(), 0, 1, 0, 255);
        p.pointLight(255, 0, 0, 0, 0, p.sqrt(p.width ** 2 + p.height ** 2));
        p.noStroke();
        p.ambientLight(red, 0, 0);
        p.specularMaterial(255, 0, 0);
        p.translate(0, -100, 0);
        p.sphere(radius);
    };

    h.osc(10, 0.1, Math.PI / 2)
        .color(1, 0, 3)
        .layer(h.src(h.s0))
        .blend(h.noise(3))
        .rotate(0.5)
        //.modulate(h.osc(() => sv.fft.analyze()[0]))
        .scrollX(0.1, 0.1)
        .scrollY(0.1, -0.1)
        .modulate(h.osc(0.2, 0.05).rotate(Math.PI / 2))
        .out(h.o0)

    h.render(h.o0);

}