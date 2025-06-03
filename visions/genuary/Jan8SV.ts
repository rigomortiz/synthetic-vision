import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";

class Drop {
	x: number;
	y: number;
	z: number;
	width: number;
	height: number;
	yspeed: number;
	img: p5.Image;
	len: number = 10;
	maxZ: number = -1000;
	color: p5.Color;
	WIDTH_DOLLAR: number = 156;
	HEIGHT_DOLLAR: number = 66.3;

	constructor(p: p5, dollar: p5.Image) {
		this.x = p.random(-p.width, p.width);
		this.y = p.random(-p.height, p.height);
		this.z = this.maxZ;
		this.img = dollar;
		this.yspeed = p.random(50, 100)
		let r: number = p.random(1, 2);
		this.width = this.WIDTH_DOLLAR * r;
		this.height = this.HEIGHT_DOLLAR * r;
		this.len = p.map(this.z, 0, 20, 10, 20);
		this.color = p.color(0, p.random(255), 0);
	}

	fall(p: p5, count: number) {
		this.z += this.yspeed;
		let c: number = count;
		if (this.z > -this.maxZ) {
			this.z = this.maxZ;
			this.x = p.random(-p.width, p.width);
			this.y = p.random(-p.height, p.height);
			this.yspeed = p.random(50, 100)
			let r = p.random(1, 2);
			this.width = this.WIDTH_DOLLAR * r;
			this.height = this.HEIGHT_DOLLAR * r;
			this.len = p.map(this.z, 0, 20, 10, 20);
			this.color = p.color(0, p.random(255), 0);
			c += 1
		}

		return c;
	}

	show(p: p5) {
		p.push();
		p.translate(this.x, this.y, this.z);
		p.tint(this.color);
		p.image(this.img, 0, 0, this.width, this.height);
		p.pop();
	}
}

class Jan8SV extends SyntheticVisionAbstract {
    mouseMove(p: import("p5")): void {
        throw new Error("Method not implemented.");
    }
	title: string = "Draw one million of something."
	drops: Drop[] = [];
	dollar: p5.Image[] = [];
	count: number = 200;

	constructor() {
		super(true, "webgl");
	}

	preload(p: p5): void {
		this.dollar[0] = p.loadImage("/img/dollar-a.jpg");
		this.dollar[1] = p.loadImage("/img/dollar-b.jpg");
	}

	setup(p: p5, h: Hydra): void {
		p.describe(this.title);
		p.stroke(0);
		p.textFont(this.font("Staatliches"));
		p.textSize(68);
		p.textAlign(p.CENTER, p.CENTER);

		for (let i = 0; i < this.count; i++) {
			this.drops.push(new Drop(p, p.random(this.dollar)));
		}
		this.hide();
	}

	draw(p: p5, h: Hydra): void {
		p.clear()

		for (let i = 0; i < this.drops.length; i++) {
			this.count = this.drops[i].fall(p, this.count);
			this.drops[i].show(p);
		}

		p.fill(255, 215, 0);
		p.text("$ 1, 000, 000.00", 0, 0);
	}


	hydra(h: Hydra, p: p5, active: boolean): void {
		h.src(h.s0)
			// .add(h.src(h.o0).scale(1.03), .9)
			//.modulateScale(h.noise(1000), .1)
			.add(h.src(h.o0).scale(() => 1 - p.cos(h.time / 2) / 8), 0.1)
			.add(h.src(h.o0).scale(() => 1 + p.sin(h.time / 2) / 8), 0.1)
			.modulateScale(h.noise(10), .1)
			.mult(
				h.src(h.s0)
					.color(0, 1, 0)
					.scale(1.5)
					.modulate(h.noise(43), -0.3), 0.3)
			.modulateScale(h.noise(10), .01)
			.out(h.o0)

		h.render(h.o0);

	}

	keyPressed(p: p5, h: Hydra): void {
	}

	onBackCanva: () => void = () => {
	};

}

export default Jan8SV;