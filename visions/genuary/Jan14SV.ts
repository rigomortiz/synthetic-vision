import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";

class Jan14SV extends SyntheticVisionAbstract {
    mouseMove(p: import("p5")): void {
        throw new Error("Method not implemented.");
    }
	title: string = "Pure black and white. No gray.";
	captureVideo: p5.Element | undefined;

	constructor() {
		super(true, "webgl");
	}

	preload(p: p5): void {
	}

	setup(p: p5, h: Hydra): void {
		p.pixelDensity(3)
		this.captureVideo = p.createCapture("VIDEO");
		this.captureVideo.size(p.width, p.height);
		this.captureVideo.hide();
		this.hide();
	}

	draw(p: p5, h: Hydra): void {
		p.clear();
		p.image(this.captureVideo!, -p.width / 2, -p.height / 2, p.width, p.height);
		p.filter(p.THRESHOLD, 0.5);
		this.drawText(p, this.title, 0, 0);
	}

	drawText(p: p5, text: string, x: number, y: number): void {
		p.stroke(1);
		p.strokeWeight(1);
		p.fill(0);
		p.textFont(this.font("Terminus"), 64);
		p.textAlign(p.CENTER, p.CENTER);
		p.text(text, 0, 0);
	}

	hydra(h: Hydra, p: p5, active: boolean): void {
	      h.src(h.s0)
	            .modulate(h.noise(100), 0.3)
	            .add(h.src(h.o0).scale(()=> p.exp(h.time*2)), 2)
	            .scale(100)
	            .brightness(0).color(1)
	            .diff(h.src(h.s0).scale(1.0))
	            .modulateScale(h.osc(2).modulateRotate(h.o0,.74))
	            .diff(h.src(h.s0).rotate([-.012,.01,-.002,0]))
	        .out(h.o0)

	    h.render(h.o0);
	}

	keyPressed(p: p5, h: Hydra): void {
	}

	onBackCanva: () => void = () => {
	};

}

export default Jan14SV;