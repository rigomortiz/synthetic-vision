import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";

class Jan4SV extends SyntheticVisionAbstract {
	title: string = "Black on black."
	shader: p5.Shader | undefined;
	img: p5.Image | undefined;


	preload(p: p5): void {
		this.shader = p.loadShader('/shaders/vert.glsl', '/shaders/frag.glsl');
	}

	setup(p: p5, h: Hydra): void {
		p.noStroke();
		p.pixelDensity(1);
		p.describe(this.title);
		this.img = p.createImage(1, 1);
		this.img.loadPixels();
		this.img.set(0, 0, p.color(10));
		this.img.updatePixels();
		p.stroke(10)
		p.fill(20)
		this.hide();
	}

	draw(p: p5): void {
		p.shader(this.shader!);
		this.shader!.setUniform('texture', this.img!);
		this.shader!.setUniform('u_time', p.frameCount * 0.01);
		p.translate(0, 0, 0);
		//p.rect(0, 0, p.width, p.height);
		p.sphere(1)
	}

	hydra(h: Hydra, p: p5, active: boolean): void {
		h.src(h.s0)
	         .modulate(h.noise(100), 0.3)
	        .add(h.src(h.o0).scale(()=> p.exp(h.time*2)), 2)
	        .scale(100)
	        .brightness(0).color(0.5,0.5,0.5)
	        .diff(h.src(h.o0).scale(10))
	        .modulateScale(h.osc(2).modulateRotate(h.o0,.74))
	        .diff(h.src(h.o0).rotate([-.012,.01,-.002,0]))
        .out(h.o0)

		h.render(h.o0);
	}

	keyPressed(p: p5, h: Hydra): void {
	}

	onBackCanva: () => void = () => {
	};

}

export default Jan4SV;