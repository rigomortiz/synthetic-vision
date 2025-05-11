(p, h, sv) => {
    sv.video.play()
  sv.hide()
    p.draw = () => {
        p.background(0);
		sv.shader.setUniform('u_mouse', [0.5, 0.5]);
		p.push();
		  p.imageMode(p.CENTER);
		  p.image(
		    sv.video,
		    0, 0, p.width, p.height,
		    0, 0, sv.video.width, sv.video.height,
		    p.COVER
		  );
		  p.translate(0, 0, 0);
		p.rotateZ(p.frameCount);
		p.rotateX(p.frameCount);
		p.rotateY(p.frameCount);
        p.noFill()
        p.stroke(255)
		p.torus(500, 300);
		p.pop();
		p.textFont(sv.font("Terminus"));
		p.textAlign(p.CENTER);
		p.textSize(128);
		p.fill(255);
		p.text("JUDAS "// +        sv.video.time()
               ,0,0);
		p.filter(sv.shader);
    };

    h.src(h.s0)
      .modulate(h.noise(.300), -0.5)
        .add(h.src(h.o0).scale(()=> p.sen(sv.video.time())), -33.3)
      //  .add(h.src(h.o0).scale(()=> p.cos(h.time/sv.video.time())), .5)
        //.modulateScale(h.noise(1.000), 12.201)
        .modulate(h.noise(0.3), 0.5)
        .out()

    h.render(h.o0);
}