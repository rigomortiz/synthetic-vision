(p, h, sv) => {
    sv.video.play()
	if (!sv.sound.isPlaying()) {
		sv.sound.play();
	}
  sv.show()
    p.draw = () => {
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
               ,0,300);

    };

    h.src(h.s0)
        //.modulate(h.noise(sv.amplitude.getLevel() * sv.fft.waveform()[0]),
         //         sv.fft.waveform()[0])
        .add(h.src(h.o0).scale(()=> p.sen(sv.video.time())), -33.3)
        .add(h.src(h.o0).scale(()=>
          p.cos(h.time/sv.video.time())), .5)
        .modulateScale(h.noise(sv.fft.waveform()[0]), sv.amplitude.getLevel())
       .mult(
            h.src(h.s0)
                .color(1, 0 ,sv.fft.waveform()[0])
                .scale(sv.amplitude.getLevel()*20),
         sv.fft.waveform()[0])
        .out()

    h.render(h.o1);
}