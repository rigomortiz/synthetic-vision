import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import SoundManager from "../../src/managers/SoundManager";


class OperaSV extends SyntheticVisionAbstract {
	title: string = "Opera"
	video: p5.MediaElement | null = null;
	audio: p5.SoundFile | null = null;
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
		    texture2D(tex0, zoom(vTexCoord, 0.3)).g,
		    texture2D(tex0, zoom(vTexCoord, 0.3)).b,
		    texture2D(tex0, vTexCoord).a
		  );
		}
		`;

	constructor() {
		super(true, "webgl");
	}

	preload(p: p5): void {
		this.video = p.createVideo("/video/MVI_1640.mp4");
		this.sound = p.loadSound("/audio/opera.mp3");
		this.video!.hide();
		this.video.showControls()
		this.video!.loop();
		this.video!.volume(0);
		//this.shader = p.createShader(this.vertexSrc, this.fragmentSrc);
		this.shader = p.loadShader('/shaders/shaderRGB.vert', '/shaders/shaderRGB.frag');
	}

	setup(p: p5, h: Hydra): void {
		p.describe(this.title);
		p.noStroke()
		p.normalMaterial();
		//this.hide();
	    this.fft = this.initFFT(p, "sound");
        this.amplitude = this.initAmplitude(p, "sound");
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

export default OperaSV;