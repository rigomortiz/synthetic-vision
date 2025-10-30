import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";

class Jan15SV extends SyntheticVisionAbstract {
	img: p5.Image | undefined;

    mouseMove(p: import("p5")): void {
        throw new Error("Method not implemented.");
    }

	constructor() {
		super(true, "p2d");
	}

	preload(p: p5): void {
		this.img = p.loadImage("/img/tigre.jpg");
	}

	setup(p: p5, h: Hydra): void {
        //p.noSmooth();
        p.image(this.img!, 0, 0, p.width, p.height);
		p.filter(p.THRESHOLD);
		for(let y = 0; y < p.height; y+=10) {
		  for(let x = 0; x < p.width; x+=10) {
			let pixel = p.get(x, y)
			if(pixel[0] === 255 && pixel[1] === 255 && pixel[2] === 255) {
				p.fill(100);
				p.strokeWeight(.5);
				this.drawText(p, "<", x, y, 40);
			} else {
				p.fill(0);
				p.strokeWeight(1);
				this.drawText(p, "<>", x, y, 40);
			}
		  }
		}
	}

	draw(p: p5, h: Hydra): void {

	}

	drawText(p: p5, text: string, x: number, y: number, size: number): void {
		p.textFont(this.font("Terminus"), size);
		p.textAlign(p.CENTER, p.CENTER);
		p.text(text, x, y);
	}

	hydra(h: Hydra, p: p5, active: boolean): void {
		this.hide()

		h.src(h.s0).color(1,.5,.2)
		        .scale(1.05)
		        .add(h.src(h.o0).brightness(-.9), .7)
		        .add(h.s0)
		        .modulateScale(h.noise(10), .01)
		        .out()

        h.render(h.o0);
	}

	keyPressed(p: p5, h: Hydra): void {
	}

	onBackCanva: () => void = () => {
	};

}

export default Jan15SV;