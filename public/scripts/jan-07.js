(p, h, sv) => {
	p.draw = () => {
		p.clear()
		sv.drawCyberpunkFrame(p);
		//sv.drawTerminatorVision(p);
	};

	h.src(h.s1)
		.saturate(0)
		.color(.9, 0, 0)
		.modulateHue(h.src(h.s1).hue(.1).posterize(-1).contrast(.1), 2)
		.layer(h.src(h.s1)
			.luma()
			.mult(h.gradient(1)
				.saturate(0.1)))
		.modulateScale(h.noise(20), 0.01)
		.modulate(h.noise(3), 0.5)
		.out(h.o0)

}