import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import FontManager from "../src/managers/FontManager";
import SyntheticVisionAbstract from "../src/SyntheticVisionAbstract";
import {FontPaths, Fonts} from "../src/enums/Fonts";
import {NoSignalColors} from "../src/enums/Colors";
import GlitchEffect from "../src/effects/GlitchEffect";

class GlitchWorldSV extends SyntheticVisionAbstract {
	title: string = "Glitch World";
	bgImage!: p5.Image;
	capture!: p5.Element;
	displaceColors!: p5.Shader;

	displaceColorsSrc = `
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

	glitchPixels(p: p5) {
		for (let y = 0; y < p.height; y++) {
		  for (let x = 0; x < p.width; x++) {
			let index = (x + y * p.width) * 4;
			if (Math.random() < 0.1) { // 10% chance to glitch a pixel
			  p.pixels[index] = p.random(255); // Red
			  p.pixels[index + 1] = p.random(255); // Green
			  p.pixels[index + 2] = p.random(255); // Blue
			}
		  }
		}
	  };

	preload(p: p5) {
		this.bgImage = p.loadImage("/img/blue-screen.jpg");
	}

	setup(p: p5, h: Hydra): void {
		this.capture = p.createCapture("video");
		this.capture.size(p.width, p.height);
		this.capture.hide();
		// @ts-ignore
		this.displaceColors = p.createFilterShader(this.displaceColorsSrc);
		p.pixelDensity(2);
	}

	draw(p: p5): void {
		//p.background(0);
		//p.clear();
		p.lights();
		p.orbitControl();
		p.push();
		p.imageMode(p.CENTER);
		p.image(this.capture, 0, 0, p.width * .7, p. height * .7, 0, 0, this.capture.width, this.capture.height, p.COVER);
		p.tint(255, 40);
		p.image(this.bgImage, 0, 0, p.width, p.height);
		p.pop();
		//@ts-ignore
		p.filter(this.displaceColors);
		//GlitchEffect.text(p, this.title,FontManager.getFont(Fonts.Terminus), 100, 0, 0, 10);
	}


	hydra(h: Hydra, p: p5, active: boolean = false): void {
		if (!active) return;

		h.src(h.s0)
		.add(h.src(h.o0).scale(()=>1 - p.cos(h.time/4)/2), .4)
		.add(h.src(h.o0).scale(()=>1 + p.sin(h.time/4)/2), .48)
		.modulateScale(h.noise(1000), .03)
		.out()

		h.render(h.o0);

	}


	keyPressed(p: p5): void {
		if (p.keyCode === p.BACKSPACE) {
			this.remove();
			this.onBackCanva();
		}
	}

	onBackCanva: () => void = () => {
	};


}

export default GlitchWorldSV;