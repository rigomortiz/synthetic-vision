import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";

class Jan7SV extends SyntheticVisionAbstract {
    mouseMove(p: import("p5")): void {
        throw new Error("Method not implemented.");
    }
	constructor() {
		super(true, "webgl");
	}

	preload(p: p5): void {
	}

	setup(p: p5, h: Hydra): void {
		this.initScreenCaptureHydra(p, h);
		p.frameCount = 3;
	}

	draw(p: p5, h: Hydra): void {
		p.clear()
		this.drawCyberpunkFrame(p);
		//this.drawTerminatorVision(p);
	}

	drawCyberpunkFrame(p: p5): void {
	    const neonColor = p.color(0, 255, 255);
		p.translate(-p.width / 2, -p.height / 2);
		p.stroke(neonColor);
		p.strokeWeight(10);
		p.fill(0);
		p.rect(0, 0, p.width, 150);
		p.rect(0, 0, 100, p.height);
		p.rect(0, p.height - 150, p.width, 150);
		p.rect(p.width - 100, 0, 100, p.height);
	}

	drawTerminatorVision(p: p5): void  {
	    const redColor = p.color(255, 0, 0);

		  // Draw crosshair
		  p.stroke(redColor);
		  p.strokeWeight(2);
		  p.line(p.width / 2 - 20, p.height / 2, p.width / 2 + 20, p.height / 2);
		  p.line(p.width / 2, p.height / 2 - 20, p.width / 2, p.height / 2 + 20);

		  // Draw target boxes at random positions
		  p.noFill();
		  const targetBox1X = p.random(0, p.width - 100);
		  const targetBox1Y = p.random(0, p.height - 100);
		  const targetBox2X = p.random(0, p.width - 100);
		  const targetBox2Y = p.random(0, p.height - 100);
		  p.rect(targetBox1X, targetBox1Y, 100, 100);
		  p.rect(targetBox2X, targetBox2Y, 100, 100);

		  // Draw text
		  p.fill(redColor);
		  p.noStroke();
		  p.textSize(16);
		  p.textFont(this.font("Terminus"));
		  p.text("TARGET ACQUIRED", targetBox1X + 10, targetBox1Y - 10);
		  p.text("TARGET ACQUIRED", targetBox2X + 10, targetBox2Y - 10);

		  // Draw scan lines
		  p.stroke(redColor);
		  p.strokeWeight(1);
		  for (let i = 0; i < p.height; i += 10) {
		    p.line(0, i, p.width, i);
		  }
	  };


	hydra(h: Hydra, p: p5, active: boolean): void {
		h.src(h.s1)
		 .saturate(0)
		 .color(.9,0,0)
		 .modulateHue(h.src(h.s1).hue(.1).posterize(-1).contrast(.1),2)
		  .layer(h.src(h.s1)
		         .luma()
		         .mult(h.gradient(1)
		               .saturate(0.1)))
	        .modulateScale(h.noise(20), 0.01)
			.modulate(h.noise(0.3), 0.01)
		  .out(h.o0)

		h.render(h.o0);
	}

	keyPressed(p: p5, h: Hydra): void {
	}

	onBackCanva: () => void = () => {
	};

}

export default Jan7SV;