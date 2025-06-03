import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import SyntheticVisionAbstract from "../src/SyntheticVisionAbstract";
import FontManager from "../src/managers/FontManager";
import {Fonts} from "../src/enums/Fonts";
import {NoSignalColors} from "../src/enums/Colors";

class NullPointerExceptionSV extends SyntheticVisionAbstract {
    mouseMove(p: import("p5")): void {
        throw new Error("Method not implemented.");
    }
	title: string = "NullPointerException";
	size: number = 100;

	preload(p: p5) {
	}

	setup(p: p5, h: Hydra): void {
		p.pixelDensity(1);
	}

	draw(p: p5, h: Hydra): void {
		p.clear();
		p.lights();
		p.orbitControl();
		p.rotate(p.frameCount * 0.01, [1, 1, 1]);
		this.drawText(p);
		let level = this.amplitude!.getLevel();
		let waveform = this.fft!.waveform();
		p.fill(p.random(0, 255), 0, 0);
		//p.rect(0, 0, p.width, p.height);
		//p.camera(waveform[5] * 1000, waveform[5] * 1000, waveform[5] * 1000, 0, 0, 0, 0, 1, 0);

		p.sphere(this.size);
		p.filter(p.BLUR, 1);
		this.size =  this.size - 1;
		if (this.size < 1) {
			this.size = p.width / 2;
		}

		p.beginShape();
		for (let i = 0; i < waveform.length; i++){
			let x = p.map(i, 0, waveform.length, -p.width/2,  p.width/2);
			let y = p.map( waveform[i], -1, 1, -p.height/2, p.height/2);
			p.vertex(x,y, 0);
		}
		p.endShape();

		//p.fill(p.mouseX/5, p.mouseY/5, 255, 50)
		//p.circle(p.mouseX, p.mouseY, 10)

		let diameter = p.map(level, 0, 0.1, 10, 200);
		p.sphere(diameter);
		p.translate(0, 0, diameter);
		//p.translate(0, 0, 200);
	}

	stringLargeOfBits(p: p5): string{
		let string = "";
		for (let i = 0; i < 500; i++){
			string += p.random(0, 1) > 0.5 ? "1" : "0";
		}

		return string;

	}

	drawText(p: p5): void {
		p.textAlign(p.CENTER, p.CENTER);
		p.textFont(FontManager.getFont(Fonts.Terminus));
		p.fill(NoSignalColors.White);
		p.textSize(100);
		p.text(this.stringLargeOfBits(p), 0, 0);
	}

	hydra(h: Hydra, p: p5, active: boolean = false): void {
		if (!active) return;
		h.src(h.o0)
			.rotate(0.9, 0.1)
			.scale(1)
			.blend(h.src(h.o0).brightness(-.02), .4)
			.modulateHue(h.o0, () => this.fft!.analyze()[5] * .5)
			.modulate(h.o0, () => this.fft!.analyze()[1] * .2)
			.layer(h.s0)
			.out(h.o0);

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

export default NullPointerExceptionSV;