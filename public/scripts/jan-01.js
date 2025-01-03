(p, h, sv) => {
    h.update = () => {
        p.redraw();
    }
    p.draw = () => {
        let numLines = 10;
		p.clear()
        p.orbitControl();
		p.fill(255);
		p.stroke(255);
		p.strokeWeight(1);
		for (let i = 0; i < numLines; i++) {
			let y = p.map(i, 0, numLines, -p.height/2, p.height/2);
            let noiseValue = p.noise(p.frameCount * 0.01 + i * 0.1) * p.width;
            p.line(noiseValue  + p.width / 2, y, noiseValue - p.width / 2, y);
		}
    };

    h.src(h.s0)
        //.modulate(h.noise(3), 0.5)
        .add(h.src(h.o0).scale(()=> p.tan(h.time/2)), .5)
        .modulateScale(h.noise(1000), .01)
        //.modulate(h.noise(3), 0.5)
        .out()

    h.render(h.o0);

}