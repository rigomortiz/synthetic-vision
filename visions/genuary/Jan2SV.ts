import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";

class Jan2SV extends SyntheticVisionAbstract {
    mouseMove(p: import("p5")): void {
        throw new Error("Method not implemented.");
    }
	constructor() {
		super(true, "webgl");
	}

    preload(p: p5): void {
    }

    setup(p: p5, h: Hydra): void {
		p.describe('Layers upon layers upon layers.');
    }

    draw(p: p5, h: Hydra): void {
		p.clear();
        p.orbitControl(0.1);
        let x = p.random(-p.width / 2, p.width / 2);
        let y = p.random(-p.height / 2, p.height / 2);
        let z = p.random(-500, 500);
        p.fill(0, p.random(255), 0)
        p.strokeWeight(1)
        p.stroke(0, p.random(255), 0)
        //p.texture(h.s0)
        p.translate(x, y, z);
        p.box(p.random(200));
    }

    hydra(h: Hydra, p: p5, active: boolean): void {
		h.src(h.o0)
	        //.scale(1.05)
	        .blend(h.src(h.o0).brightness(-.02), .4)
	        .layer(h.s0)
	        .modulateScale(h.noise(10), .01)
	        .out()

        h.render(h.o0);
    }

    keyPressed(p: p5, h: Hydra): void {
    }

    onBackCanva: () => void = () => {
    };

}

export default Jan2SV;