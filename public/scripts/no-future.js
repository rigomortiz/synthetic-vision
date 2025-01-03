(p, h, sv) => {
    h.update = () => {
        p.redraw();
    }

    p.draw = () => {
        p.clear()
        p.lights();
        let level = sv.amplitude.getLevel();
        let waveform = sv.fft.waveform();
        p.fill(p.random(0, 255), 0, 0);
        //p.rect(0, 0, p.width, p.height);
        //p.camera(waveform[5] * 1000, waveform[5] * 1000, waveform[5] * 1000, 0, 0, 0, 0, 1, 0);

        p.sphere(sv.size);
        p.filter(p.BLUR, 1);
        size = size - 1;
        if (size < 1) {
            size = p.width / 2;
        }

        p.beginShape();
        for (let i = 0; i < waveform.length; i++) {
            let x = p.map(i, 0, waveform.length, -p.width / 2, p.width / 2);
            let y = p.map(waveform[i], -1, 1, -p.height / 2, p.height / 2);
            p.vertex(x, y, 0);
        }
        p.endShape();

        //p.fill(p.mouseX/5, p.mouseY/5, 255, 50)
        //p.circle(p.mouseX, p.mouseY, 10)

        let diameter = p.map(level, 0, 0.1, 10, 200);
        p.sphere(diameter);
        p.translate(0, 0, diameter);
        //p.translate(0, 0, 200);


        p.textAlign(p.CENTER, p.CENTER);
        p.fill(0);
        p.text("NO FUTURE", 0, 0);
    }

    h.src(h.o0)
        .rotate(0.9, 0.1)
        .scale(1)
        .blend(h.src(h.o0).brightness(-.02), .4)
        .modulateHue(h.o0, () => sv.fft.analyze()[5] * .5)
        .modulate(h.o0, () => sv.fft.analyze()[1] * .2)
        .layer(h.s0)
        .out(h.o0)

}
