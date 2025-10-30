import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";
import p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";

class Jan1SV extends SyntheticVisionAbstract {
    mouseMove(p: import("p5")): void {
        throw new Error("Method not implemented.");
    }
	constructor() {
		super(true, "webgl");
	}

    preload(p: p5): void {
    }

    setup(p: p5, h: Hydra): void {
		p.describe('A Init');
		p.pixelDensity(2)
    }

    draw(p: p5, h: Hydra): void {
		let numLines = 10;
		p.clear()
        p.orbitControl(0.1);
		p.fill(255);
		p.stroke(255);
		p.strokeWeight(1);
		for (let i = 0; i < numLines; i++) {
			let y = p.map(i, 0, numLines, -p.height/2, p.height/2);
			let noiseValue = p.noise(p.frameCount * 0.01 + i * 0.1) * p.width/2;
            p.line(p.width / 2 - noiseValue, y, noiseValue - p.width / 2, y);
		}
    }

    hydra(h: Hydra, p: p5, active: boolean): void {
		 h.src(h.s0)//.osc(10, 0.1, 1.5)
			//.modulate(h.noise(3), 0.5)
	        .add(h.src(h.o0).scale(()=> p.tan(h.time/2)), .5)
	        .modulateScale(h.noise(1000), .01)
	        //.modulate(h.noise(3), 0.5)
	        .out()

        h.render(h.o0);
    }

    keyPressed(p: p5, h: Hydra): void {
    }

    onBackCanva: () => void = () => {
    };

}

export default Jan1SV;