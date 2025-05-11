import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";

class Jan12SV extends SyntheticVisionAbstract {
	title: string = "Subdivision"
	video: p5.MediaElement | null = null;
	shader: p5.Shader | undefined;
	vertexSrc: string = `
		precision highp float;

		attribute vec3 aPosition;
		attribute vec2 aTexCoord;
		uniform vec2 u_mouse;
		varying vec2 vTexCoord;
		
		void main() {
		  gl_Position = vec4(aPosition, u_mouse.x);
		  vTexCoord = aTexCoord;
		}
		`;
	fragmentSrc: string = `
		precision highp float;

		uniform sampler2D tex0;
		varying vec2 vTexCoord;
		
		vec2 zoom(vec2 coord, float amount) {
		  vec2 relativeToCenter = coord - 0.5;
		  relativeToCenter /= amount; // Zoom in
		  return relativeToCenter + 0.5; // Put back into absolute coordinates
		}
		
		void main() {
		  // Get each color channel using coordinates with different amounts
		  // of zooms to displace the colors slightly
		  gl_FragColor = vec4(
		    texture2D(tex0, vTexCoord).r,
		    texture2D(tex0, zoom(vTexCoord, 1.05)).g,
		    texture2D(tex0, zoom(vTexCoord, 1.1)).b,
		    texture2D(tex0, vTexCoord).a
		  );
		}
		`;

	constructor() {
		super(true, "webgl");
	}

	preload(p: p5): void {
		this.video = p.createVideo("/video/diablo.MOV");
		this.video!.hide();
		this.video.showControls()
		this.video!.loop();
		this.video!.volume(0);

		this.shader = p.createShader(this.vertexSrc, this.fragmentSrc);
		p.angleMode(p.DEGREES);

	}

	setup(p: p5, h: Hydra): void {
		p.describe(this.title);
		p.noStroke()
		p.normalMaterial();
		//this.hide();
	}

	draw(p: p5): void {
		//p.background(0);
		p.textFont(this.font("Terminus"));
		p.textAlign(p.CENTER);
		p.textSize(128);
		p.fill(255);
		p.text("PRESS RUN",0,0);
	}

	hydra(h: Hydra, p: p5, active: boolean): void {
     h.src(h.s0)
        .modulate(h.noise(.300), -0.5)
        .add(h.src(h.o0).scale(()=> p.cos(h.time/2)), .5)
        .modulateScale(h.noise(1.000), 12.201)
       .modulate(h.noise(0.3), 0.5)
        .out()

		h.render(h.o0);
	}

	keyPressed(p: p5, h: Hydra): void {
	}

	onBackCanva: () => void = () => {
	};

}

export default Jan12SV;