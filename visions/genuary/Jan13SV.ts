import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";

class Jan13SV extends SyntheticVisionAbstract {
    mouseMove(p: import("p5")): void {
        throw new Error("Method not implemented.");
    }
	title: string = "Triangles and nothing else."
	shader: p5.Shader | undefined;

	constructor() {
		super(true, "webgl");
	}

	preload(p: p5): void {
		this.shader = p.loadShader("/shaders/sierpinski.vert", "/shaders/sierpinski.frag");
		p.angleMode(p.DEGREES);
	}

	setup(p: p5, h: Hydra): void {
		p.describe(this.title);
		p.shader(this.shader!);
		p.stroke(255)
		this.hide();
	}

	draw(p: p5, h: Hydra): void {
		p.plane(p.width, p.height);
		this.shader!.setUniform('iResolution', [p.width, p.height]);
        this.shader!.setUniform('iTime', p.millis() / 1000.0);
	}

	hydra(h: Hydra, p: p5, active: boolean): void {
      h.osc(3, -0.3, -0.003)
		    .kaleid(3)
		    .color(3, 3, 3)
		    .colorama(0.3)
		    .rotate(0.003,()=>Math.cos(h.time)* -0.003 )
		    .modulateRotate(h.o0,()=>Math.cos(h.time) * 0.003)
		    .modulate(h.o0, 0.3)
		    .add(h.s0)
	        .scale(3)
	        .brightness(0)
            .color(.3, .3, .3).colorama(.02)
		    .scale(0.3)
		    .out(h.o0)

	}

	keyPressed(p: p5, h: Hydra): void {
	}

	onBackCanva: () => void = () => {
	};

}

export default Jan13SV;