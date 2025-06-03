
(p, h, sv) => {
    sv.video.play()
	if (!sv.sound.isPlaying()) {
		sv.sound.play();
	}
  sv.hide()
    p.draw = () => {
     p.background(0,0,0, 20)
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
       let numLines = 100;
		//p.clear()
              p.orbitControl();

		p.fill(0,255,0);
		p.stroke(0,255,0);
		p.strokeWeight(1);
		for (let i = 0; i < numLines; i++) {
			let y = p.map(i, 0, numLines, -p.height/2, p.height/2);
            let noiseValue = p.noise(p.frameCount * 0.01 + i * 0.1) * p.width;
            p.line(noiseValue  + p.width / 2, y, noiseValue - p.width / 2, y);
		}



    };

  h.setFunction({
    name: 'myModulator',
    type: 'combineCoord',
    inputs: [],
    glsl: `
        return vec2(_st.x+(_c0.g-_c0.b*0.01),
        _st.y+(_c0.r*0.02));
    `
})
  h.src(h.s0)
   // .modulate(h.noise(0.03), 0.5)
  .myModulator(h.src(h.s0))
    //.modulateScale(h.noise(0.1), 1)
   // .modulate(h.noise(0.03), 0.5)
	.out()

     /*h.src(h.s0)
        .modulate(h.noise(0.03), 0.5)
      //  .add(h.src(h.o0).scale(()=> p.tan(h.time/2)), .5)
        .modulateScale(h.noise(0.1), 1)
        .modulate(h.noise(0.03), 0.5)
        .out()
*/
    h.render(h.o0);
}
