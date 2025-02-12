import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import SyntheticVisionAbstract from "../src/SyntheticVisionAbstract";
import {Sounds} from "../src/enums/Sounds";
import {Fonts} from "../src/enums/Fonts";
import {BladeRunnerColors} from "../src/enums/Colors";

class NoFutureVS extends SyntheticVisionAbstract {
	explosionColor: p5.Color | undefined;
	explosionRadius = 0;
	explosionSpeed = 5;
	maxRadius: number = 100;
	size: number = 0;
	constructor() {
		super(true, "webgl", false);
	}

	preload(p: import("p5")): void {
		//SoundManager.preloadSounds(p, SoundPaths);
	}

	setup(p: p5, h: Hydra): void {
		//this.initSound(p, Sounds.NoFuture);
		this.initMic(p);
		this.size = window.innerWidth / 2;
		this.explosionColor = p.color(255, 0, 0);
	}

	draw(p: import("p5")): void {
		p.clear()
		//p.lights();
		p.orbitControl(3)
		let level = this.amplitude!.getLevel();
		let waveform = this.fft!.waveform();
		let energy = this.fft!.getEnergy("bass");
		let diameter = p.map(level, 0, 1, 10, 200);
		let color = p.map(level, 0, 1, 100, 255);
		let amplitude = this.amplitude!.getLevel() * 1000;

		p.box(amplitude, amplitude, amplitude);
		/*
		p.fill(color, 0, 0);
		p.sphere(this.size);
		//p.filter(p.BLUR, 1);
		this.size =  this.size - level;
		if (this.size < 1) {
			this.size = p.width;
		}*/
		p.fill(color, 0, 0);
		p.beginShape();
		for (let i = 0; i < waveform.length; i++){
			let x = p.map(i, 0, waveform.length, -p.width/2,  p.width/2);
			let y = p.map( waveform[i], -1, 1, -p.height/2, p.height/2);
			p.vertex(x,y, 0);
		}
		p.endShape();

		p.sphere(energy);
		p.translate(0, 0, diameter);
		p.translate(0, 0, 200);

		// dibuja una elipse con altura según el volumen
		let h = p.map(level, 0, 1, p.height, 0);
		p.fill(255, 0, 0);
		p.sphere(h);

		this.drawTextRandomly(p, "NO FUTURE", 0, 0);
	}

	hydra(h: Hydra, p: p5, active: boolean): void {
		if(!active) return

		h.setFunction({
				name: 'myModulator',
				type: 'combineCoord',
				inputs: [],
				glsl: `
		        return vec2(_st.x+(_c0.g-_c0.b*0.1),_st.y+(_c0.r*0.2));
		    `})

        /*


		h
		.src(h.o0)
		.rotate(0.1, 0.1)
		.scale(0.01)
		.blend(h.src(h.o0).brightness(-0.1), 0.5)
		.myModulator(h.osc(200,.1,1).diff(h.o0))
		.modulateHue(h.o0, () => this.fft!.analyze()[0] * .2)
		.modulateHue(h.o0, () => this.fft!.getEnergy("bass") * .5)
		.modulate(h.o0, () => this.explosionRadius * 0.01)
		.out(h.o0);*/

		h.src(h.o0)
		.rotate(0.9, 0.1)
		.scale(43)
		.blend(h.src(h.o0).brightness(-.02), .4)
		.myModulator(h.osc(this.fft!.analyze()[0], -this.fft!.getEnergy("bass"), this.fft!.getEnergy("bass") ).diff(h.o0))
		.modulateHue(h.o0, () => this.fft!.analyze()[0] * 10)
		.modulateHue(h.o0, () => this.fft!.getEnergy("bass") * .5)
		.layer(h.s0)
		.out(h.o0)
	}

	keyPressed(p: p5, h: Hydra): void {
		p.keyPressed = () => {
			if (p.keyCode === p.ENTER) {
				// @ts-ignore
				if (this.sound.isPlaying()) {
					// .isPlaying() returns a boolean
					// @ts-ignore
					this.sound.pause();
				} else {
					// @ts-ignore
					this.sound.play();
				}
			}
		}
	}

	onBackCanva: () => void = () => {
	};

	drawTextRandomly(p: p5, text: string, x: number, y: number) {
		p.textFont(this.font(Fonts.Volunmo));
		p.textSize(250);
		p.fill(BladeRunnerColors.HologramWhite);
		p.textAlign(p.CENTER, p.CENTER);
		p.text(text, x + p.random(-5, 5), y + p.random(-5, 5));
	}
}

export default NoFutureVS;