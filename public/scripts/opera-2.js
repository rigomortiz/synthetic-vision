(p, h, sv) => {
    sv.video.play()
	if (!sv.sound.isPlaying()) {
		sv.sound.play();
	}
  sv.hide()
    p.draw = () => {
     p.background(0,0,0, 10)
		sv.shader.setUniform('u_mouse', [.5, .5]);
		p.push();
		  p.imageMode(p.CENTER);
		  p.image(
		    sv.video,
		    0, 0, p.width, p.height,
		    0, 0, sv.video.width, sv.video.height,
		    p.COVER
		  );
     p.filter(sv.shader);
     // p.clear();
        p.orbitControl();
      let r = p.random(255); // r is a random number between 0 - 255
      let g = p.random(255); // g is a random number betwen 100 - 200
      let b = p.random(255); // b is a random number between 0 - 100
      let a = p.random(200,255); // a is a random number between 200 - 255
        let x = p.random(-p.width / 2, p.width / 2);
        let y = p.random(-p.height / 2, p.height / 2);
        let z = p.random(-500, 500);
        p.fill(r,g,b,a)
        p.strokeWeight(1)
        p.stroke(r,g,b,a)
        //p.texture(h.s0)
        p.translate(x, y, z);
        p.box(p.random(200));/*
		  p.translate(0, 0, 0);
		p.textFont(sv.font("Volunmo"));
		p.textAlign(p.CENTER);
		p.textSize(300);
		p.fill(255);
		p.text("OPERA"// +        sv.video.time()
               ,0,0);
      p.textSize(46);
      p.textFont(sv.font("Terminus"));
      p.text("Sinfonía audiovisual"// +        sv.video.time()
               ,0,-300);
      p.textSize(32);
      p.text("@bad_request & @rigomortiz"// +        sv.video.time()
               ,0,300);*/

    };

    h.src(h.s0)
      .mult(h.src(h.s0).color(sv.amplitude.getLevel()*100)
               .scale(3.0), sv.fft.waveform()[0]*100)
      .scale(1)
       .blend(h.src(h.o0).brightness(.02), .4)
        .layer(h.s0)
        .modulateScale(h.noise(10), .2)
        .out()

    h.render(h.o0);
}
