(p, h, sv) => {
    p.draw = () => {
        p.clear();
        p.fill(0, 42, 0);
        p.stroke(0, 42, 0);
        p.strokeWeight(.42);
        p.textFont('monospace', sv.lineHeight);
        p.textAlign(p.LEFT, p.TOP);
        p.background(0,0,0,42);

        if (sv.frameCounter < sv.maxFrames) {
            for (let i = 0; i < sv.numLines; i++) {
                for (let j = 0; j < p.width / sv.lineHeight; j++) {
                    if (p.random(1) < 0.42) {
                        sv.numbers[i][j] = sv.digits.charAt(p.floor(p.random(10)));
                    }
                    p.text(sv.numbers[i][j], j * sv.lineHeight, i * sv.lineHeight);
                }
            }
            sv.frameCounter++;
        } else {
            p.background(0,42,0,42);
            p.textAlign(p.CENTER, p.CENTER);
            p.text(sv.title, p.width / 2, p.height / 2);
            setTimeout(() => {
                sv.frameCounter = 0;
            }, 42*100);
        }
    };

    h.src(h.s0)
        .color(0,.42,0)
        .scale(4.2)
        //.modulate(h.noise(-.42), -.42)
        .blend(h.src(h.o0).brightness(-.42), -.42)
        .layer(h.s0)
        .modulateScale(h.noise(.42), .42)
        .add(h.src(h.o0).scale(()=> p.tan( h.time*.42)), .42)
        //.modulateScale(h.noise(4.2).modulate(h.noise(-.42), -0.42), 4.2)

        .out(h.o0)
}