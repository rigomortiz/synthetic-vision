(p, h, sv) => {
    p.draw = () => {
        p.shader(sv.shader);
		sv.shader.setUniform('texture', sv.img);
		sv.shader.setUniform('u_time', p.frameCount * 0.1);
		p.translate(0, 0, 0);
		//p.rect(0, 0, p.width, p.height);
		p.sphere(1)
    };

     h.src(h.s0)
            .modulate(h.noise(100), 0.3)
            .add(h.src(h.o0).scale(()=> p.exp(h.time*2)), 2)
            .scale(100)
            .brightness(0).color(0.5,0.5,0.5)
            .diff(h.src(h.o0).scale(10))
            .modulateScale(h.osc(2).modulateRotate(h.o0,.74))
            .diff(h.src(h.o0).rotate([-.012,.01,-.002,0]))
        .out(h.o0)

    h.render(h.o0);

}