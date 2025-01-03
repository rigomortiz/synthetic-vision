import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import FontManager from "../managers/FontManager";
import {FontPaths, Fonts} from "../enums/Fonts";
import SoundManager from "../managers/SoundManager";
import {SoundPaths, Sounds} from "../enums/Sounds";

const vision = (p: p5, h: Hydra) => {
	let canvas: p5.Renderer;
	let dia: number;
	let sound: p5.SoundFile;
	let fft: p5.FFT | undefined;
	let analyzer: p5.Amplitude | undefined;

	p.preload = () => {
		FontManager.preloadFonts(p, FontPaths);
		SoundManager.preloadSounds(p, SoundPaths);
	};

	p.setup = () => {
		canvas = p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
		p.colorMode(p.RGB)
		sound = SoundManager.getSound(Sounds.NoFuture);
		// @ts-ignore
		fft = new p.constructor.FFT();
		sound.connect(fft);
		// @ts-ignore
		analyzer = new p.constructor.Amplitude();
		// @ts-ignore
		analyzer.setInput(sound);
		p.noCursor();
		p.noLoop();
		h.s0.init({ src: canvas.elt });
		p.textFont(FontManager.getFont(Fonts.Volunmo));
		p.textSize(250);
		p.describe('A Synthetic Vision Animation');
		alert('Press Enter to start the animation and sound');
	};

	p.draw = () => {
		p.clear();
		p.lights();
		// @ts-ignore
		let level = analyzer.getLevel();
		// @ts-ignore
		let waveform = fft.waveform();
		p.fill(p.random(0, 255), p.random(0, 255), p.random(0, 255));
		p.filter(p.BLUR, 2);

		p.beginShape();
		for (let i = 0; i < waveform.length; i++) {
			let x = p.map(i, 0, waveform.length, -p.width / 2, p.width / 2);
			let y = p.map(waveform[i], -1, 1, -p.height / 2, p.height / 2);
			p.vertex(x, y, 0);
		}
		p.endShape();

		let diameter = p.map(level, 0, 0.1, 0, 255);
		p.sphere(diameter);
		p.translate(0, 0, diameter);
		p.filter(p.BLUR, 3);
		p.textAlign(p.CENTER, p.CENTER);
		p.fill(diameter, 0, 0);
		p.text("SYNTHETIC VISION", 0, 0);
	};

	h.update = () => {
		p.redraw();
	};

	p.keyPressed = () => {
		if (p.keyCode === p.ENTER) {
			if (sound.isPlaying()) {
				sound.pause();
			} else {
				sound.play();
			}
		}
	};

	h.src(h.o0)
		.rotate(0.09, 0.01)
		.scale(0.8)
		.blend(h.src(h.o0).brightness(-0.02), 0.04)
		// @ts-ignore
		.modulateHue(h.o0, () => fft.analyze()[0] * 0.5)
		// @ts-ignore
		.modulate(h.o0, () => fft.analyze()[0] * 0.2)
		.layer(h.s0)
		.out(h.o0);
};


export default vision;
