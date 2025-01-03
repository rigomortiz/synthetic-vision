import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import SyntheticVisionAbstract from "../src/SyntheticVisionAbstract";
import {BladeRunnerColors, MatrixColors, TechnoColors} from "../src/enums/Colors";
import FontManager from "../src/managers/FontManager";
import {Fonts} from "../src/enums/Fonts";
import NoiseEffect from "../src/effects/NoiseEffect";

class MenuSV extends SyntheticVisionAbstract {
	menu: Array<String> = this.generateRandomMenu();

	selectedTextIndex = 0;


	onBackCanva: () => void = () => {
	};

	onInitCanva: () => void = () => {
	};

	onTheBitBalletCanva: () => void = () => {

	}

	onNullPointerExceptionCanva: () => void = () => {

	}

	onGlitchWorldCanva: () => void = () => {

	}

	onEncryptedNodeCanva: () => void = () => {

	}


	keyPressed(p: p5): void {
		if (p.keyCode === p.UP_ARROW) {
			this.pressUp();
		} else if (p.keyCode === p.DOWN_ARROW) {
			this.pressDown();
		}

		if (p.keyCode === p.ENTER && this.selectedTextIndex === 0) {
			this.remove();
			this.onInitCanva();
		} else if (p.keyCode === p.ENTER && this.selectedTextIndex === 1) {
			this.remove();
			this.onTheBitBalletCanva();
		} else if (p.keyCode === p.ENTER && this.selectedTextIndex === 2) {
			this.remove();
			this.onNullPointerExceptionCanva();
		} else if (p.keyCode === p.ENTER && this.selectedTextIndex === 3) {
			this.remove();
			this.onGlitchWorldCanva();
		} else if (p.keyCode === p.ENTER && this.selectedTextIndex === 4) {
			this.remove();
			this.onEncryptedNodeCanva();
		}
	}

	preload(p: Hydra): void {

	}

	setup(p: p5, h: Hydra): void {
		p.describe('A menu');
	}

	draw(p: p5): void {
		p.clear()
		this.drawTitle(p);
		this.drawSubtitle(p);
		this.drawMenu(p);

	}

	hydra(h: Hydra, p: p5, active: boolean = false): void {
		if (!active) return;

		h.osc(10, 0.1, 1)
			.color(1, 0, 0)
			.kaleid(5)
			.modulate(h.noise(this.mic!.getLevel()*100).scale(this.fft!.analyze()[0]*.5))
			.modulate(h.osc(() => this.fft!.analyze()[0]*.5))
			.blend(h.noise(this.mic!.getLevel()*100))
			.modulate(h.osc(0.2, 0.05).rotate(Math.PI / 2))
			.out();
	}

	drawTitle(p: p5) {
		p.textAlign(p.CENTER);
		p.fill(BladeRunnerColors.NeonRed);
		p.textSize(200);
		p.textFont(FontManager.getFont(Fonts.Volunmo));
		p.text('NO FUTURE', 0, -p.height / 2 + 150);
		p.filter(p.BLUR, 1);
	}

	drawSubtitle(p: p5) {
		p.textAlign(p.CENTER);
		p.fill(BladeRunnerColors.HologramWhite);
		p.noStroke()
		p.textFont(FontManager.getFont(Fonts.Volunmo));
		p.textSize(50);
		p.text('By Bad Request & Rigomortiz', 0, -p.height / 4);
	}

	generateRandomMenu(): Array<String> {
		const items = [
			"__init__",
			"Digital Rain",
			"Null Pointer Exception",
			"Glitch World",
			"Encrypted Node",
			"__del__"
		];
		return items;
	}

	drawMenu(p: p5): void {
		p.textAlign(p.CENTER);
		p.textFont(FontManager.getFont(Fonts.Terminus));
		p.textSize(32);

		this.menu.forEach((text, index) => {
			if (index === this.selectedTextIndex) {
				text = `> ${text}`;
			}
			p.fill(MatrixColors.Green_4);
			p.text(text, 0 * p.width / 2, 0 * p.height / 3 + index * 40);

			// Warning effect
			if (index === this.selectedTextIndex) {
				for (let i = 0; i < 5; i++) {
					let offsetX = p.random(-2, 2);
					let offsetY = p.random(-2, 2);
					p.fill(TechnoColors.CyberYellow);
					p.text(text, 0 * p.width / 2 + offsetX, 0 * p.height / 3 + index * 40 + offsetY);
				}

				// Additional warning effect
				for (let i = 0; i < 3; i++) {
					let warningOffsetX = p.random(-5, 5);
					let warningOffsetY = p.random(-5, 5);
					p.fill(p.random([TechnoColors.CyberYellow, TechnoColors.LaserRed]));
					p.text(text, 0 * p.width / 2 + warningOffsetX, 0 * p.height / 3 + index * 40 + warningOffsetY);
				}
			}
		});
	}

	pressUp() {
		this.selectedTextIndex = (this.selectedTextIndex > 0) ? this.selectedTextIndex - 1 : this.menu.length - 1;
		NoiseEffect.soundTone();
	}

	pressDown() {
		this.selectedTextIndex = (this.selectedTextIndex < this.menu.length - 1) ? this.selectedTextIndex + 1 : 0;
		NoiseEffect.soundTone();
	}


}

export default MenuSV;