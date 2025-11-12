// @ts-nocheck

import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import {Fonts} from "../../src/enums/Fonts";
import {NoSignalColors} from "../../src/enums/Colors";
import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";
class Walker {
	constructor(p, x, y, d, clr) {
		this.xStep = 0;
		this.yStep = 0;
		this.x = x;
		this.y = y;
		this.d = d;
		this.clr = clr;
		this.footprints = [];
		for (let i = 0; i < 20; i++) {
			this.footprints.push(p.createVector(this.x, this.y));
		}
		this.segLength = 1;
	}

	show(p) {
		p.noFill();
		p.stroke(this.clr);
		p.strokeWeight(this.d);
		this.dragSegment(p, 0, this.x, this.y);
		for (let i = 0; i < this.footprints.length - 1; i++) {
			let f = this.footprints[i];
			this.dragSegment(p, i + 1, f.x, f.y);
		}
	}

	update(p) {
		let speed = 8;

		 this.x  = this.x  + p.random(-speed, speed)
		  this.y = this.y + p.random(-speed, speed)

		  this.x = p.constrain(this.x, 0, p.width)
		  this.y = p.constrain(this.y, 0, p.height)
		//this.x = p.mouseX
		//
		//let x = this.x * p.noise(0.005 * p.frameCount);
        //let y = this.y * p.noise(0.005 * p.frameCount + 10000);

		//this.x = x;
		//this.y = y;
	}

	run(p) {

		this.update(p);
		this.show(p);
	}

	dragSegment(p, i, xin, yin) {
		let f = this.footprints[i];
		let dx = xin - f.x;
		let dy = yin - f.y;
		let angle = p.atan2(dy, dx);
		f.x = xin - p.cos(angle) * this.segLength;
		f.y = yin - p.sin(angle) * this.segLength;

		this.segment(p, f.x, f.y, angle);
	}

	segment(p, x, y, a) {
		p.push();

		p.strokeWeight(1);
		p.stroke(this.clr);
		p.fill(this.clr);
		p.translate(x, y);
		p.rotate(a);
		p.line(0, 0, this.segLength, 0);
		//p.stroke("#00FF00");
		//p.point(0, 0);
		//p.stroke(this.clr);
		//p.fill("#00FF00");
		//p.circle(0, 0, this.d);
		p.pop();
	}

	joinSegments(p: p5, walkers: Walker[]) {
		walkers.forEach(element => {
			let dis = p.dist(this.x, this.y, element.x, element.y);
			if (dis < 200) {
				let color = p.lerpColor(p.color(this.clr), p.color(element.clr), 0.5);
				let stokeAlpha = p.map(dis, 0, 100, 255, 0);
				color.setAlpha(stokeAlpha);
				let strokeWeight = p.map(dis, 0, 100, 2, 0.1);
				p.stroke(color);
				p.strokeWeight(strokeWeight)
				p.line(this.x, this.y, element.x, element.y);
			}
		});
	}
}

class RecuerdosSinteticosSV extends SyntheticVisionAbstract {
  mouseMove(p: import("p5")): void {
      throw new Error("Method not implemented.");
  }
  title: string = "Recuerdos Sintéticos";
  palette = [];
	centerX;
	centerY;
	walkers = [];
	shader: p5.Shader | undefined;

  constructor() {
    super(true, "p2d");
  }

  preload(p: p5) {
  }

  setup(p: p5, h: Hydra): void {
    p.describe(this.title);
	p.background('#00000020');
	this.centerX = 0;
	this.centerY = 0;
	for (let i = 0; i < 200; i++) {
		let x = p.random(0, p.width);
		let y = p.random(0, p.height);
		let d = 1
		let walker = new Walker(p, x, y, d, p.color(p.random(255), p.random(255), p.random(255)));
		this.walkers.push(walker);
	}
	//this.hide();

  }

  draw(p: p5, h: Hydra): void {
	 //p.background('#00000020');
	  //p.clear();
	for (let i of this.walkers) {
		i.run(p);
		i.joinSegments(p, this.walkers);
	}
  }

  keyPressed(p: p5, h: Hydra): void {
  }

  hydra(h: Hydra, p: p5, active: boolean = false): void {
	 // return;
	 h.src(h.s0)
		.layer(h.src(h.s0)
			.mult(h.osc(.1,0.1,()=> Math.sin(h.time)).saturate(100).kaleid(20)) )
        .scale(.7)
		.add(h.src(h.o0)
             .color(1)
            .brightness(-.9)
			, .19)
        .add(h.s0)
      .diff(h.osc(.1000, .10, 1.5))
        .modulateScale(h.noise(10), .01)
		 .out()

    h.render(h.o0)
  }

  onBackCanva: () => void = () => {
  };
}

export default RecuerdosSinteticosSV;