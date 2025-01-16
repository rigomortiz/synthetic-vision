(p, h, sv) => {
    p.draw = () => {
        p.clear()
		p.background(0, 0, 0, 0)
		let r = 10;
		let n = 6;
		let a = [[]]
		let wc = Math.round((p.width / 2)/r) * r;
		let hc = Math.round((p.height / 2)/r) * r;

		a[0] = [0]
		let d= []
		p.fill(p.color(0, 200, 0))
		p.strokeWeight(.5)
		//p.stroke(0, 255, 0)
		p.circle(wc, hc, r);


		for(let l = 1; l < 150; l++) {
			a[l] = [];
			for (let i = 0; i < n * l; i++) {
				let x = wc + Math.cos(p.radians(i * 360 / (n * l))) * r * l;
				let y = hc + Math.sin(p.radians(i * 360 / (n * l))) * r * l;
				a[l][i] = p.random([0, 1, 2, 3]);
				let e = a[l-1][i%l]
				if (e == 1) {
					//p.noStroke()
					//p.stroke(0, 255, 0)
					p.fill(p.color(0, 200, 0))
					p.circle(x, y, r);
				} else {
					//p.noStroke()
					//p.fill(p.color(0, 0, 0))
					//p.stroke(0, 200, 0)
					//p.noStroke()
					p.noFill()
					p.circle(x, y, r);
				}

			}
		}
    };

     h.src(h.s0)
			.mult(h.osc(10,0.1,()=> Math.tan(h.time)*6).saturate(3).kaleid(200))
			.modulate(h.o0,0.5)
			.add(h.o0, 0.6)
			.scale(0.99)
			.modulate(h.voronoi(6,1),0.006)
			.luma(.1)
			.modulateScale(h.noise(100), .03)
		.out()

}