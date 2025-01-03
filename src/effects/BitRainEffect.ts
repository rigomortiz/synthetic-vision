import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import FontManager from "../managers/FontManager";
import {FontPaths, Fonts} from "../enums/Fonts";
import {func} from "prop-types";
import BitRain from "./BitRain";

const BitRainEffect = (p: p5, h: Hydra) => {
	let bits: BitRain[] = [];
	let mic: p5.AudioIn;
	let fft: p5.FFT | undefined;
	let amplitude: p5.Amplitude;
	let notosans: p5.Font;

	p.preload = () => {
		FontManager.preloadFonts(p, FontPaths);
		notosans = p.loadFont('https://fonts.gstatic.com/s/notosans/v27/o-0IIpQlx3QUlC5A4PNb4j5Ba_2c7A.woff2');
	}

	p.setup = () => {
		h.s0.init({src: p.createCanvas(window.innerWidth, window.innerHeight).elt});
		p.textSize(18);
		p.describe('A Rain of Bits');
		p.noCursor();
		p.noLoop();
		for (let i = 0; i < 300; i++) {
			bits.push(new BitRain(p));
		}
		// @ts-ignore
		mic = new p.constructor.AudioIn();
		mic.start();
		// @ts-ignore
		fft = new p.constructor.FFT();
		mic.connect(fft);
		// @ts-ignore
		amplitude = new p.constructor.Amplitude();
		mic.connect(amplitude);

	};

	p.draw = () => {
		p.clear()

		p.filter(p.BLUR, 1);
		for (let bit of bits) {
			bit.show(p, amplitude.getLevel()* 500, 1, notosans);
		}
		p.filter(p.BLUR, 0.2);

		//spectrum(fft!);

		waveform(fft!);



		//ampl(amplitude!);
	};

	function ampl(amplitude: p5.Amplitude) {
		let level = amplitude.getLevel();
		let size = p.map(level, 0, 0.1, 100, 2000);
		p.fill(255);
		p.ellipse(p.width/2, p.height/2, size, size);
		p.circle(p.width * .25, p.height/2, amplitude.getLevel() * 1000)
		p.circle(p.width / 2, p.height/2, amplitude.getLevel() * 1000)
		p.circle(p.width * .75, p.height/2, amplitude.getLevel() * 1000)
	}

	function spectrum(fft: p5.FFT) {
		let spectrum = fft.analyze();
		p.noStroke();
		p.fill(255, 0, 0);

		for (let i = 0; i < spectrum.length; i++) {
			let x = p.map(i, 0, spectrum.length, 0, p.width);
			let h = -p.height + p.map(spectrum[i], 0, 0.1, p.height, -1000);
			p.rect(x, 200, 200 / spectrum.length, h )
		}
	}

	function waveform(fft: p5.FFT) {
		let waveform = fft.waveform();
		p.noFill();
		p.beginShape();
		p.stroke(255);

		for (let i = 0; i < waveform.length; i++){
			let x = p.map(i, 0, waveform.length, 0, p.width);
			let y = p.map( waveform[i], -1, 1, 0, p.height);
			p.vertex(x,y);
		}
		p.endShape();
	}


	h.update = () => {
		p.redraw();
	}

	h.setFunction({
		name: 'negate',
		type: 'combine',
		inputs: [
			{ type: 'float', name: 'amount', default: 1 }
		],
		glsl:`
        _c1 *= amount;
        return vec4(vec3(2.0)-abs(vec3(2.0)-_c0.rgb-_c1.rgb), min(max(_c0.a, _c1.a),2.0));
    `
	})

	h.setFunction({
		name: 'glitch',
		type: 'combineCoord',
		inputs: [],
		glsl: `
      vec2 st = _st;
      st.x += sin(st.y * 10.0 + time * 5.0) * 0.01;
      st.y += cos(st.x * 10.0 + time * 5.0) * 0.01;
      return st;
    `
	});

	h.osc().negate(h.noise(0.2, 0.1)
		.color(0.0, 1.0, 0.5)
		.rotate(0.1, 0.1)
		.modulate(h.noise(5, 0.2), 0.1).brightness(.2))
		.modulate(h.o0, () => fft!.analyze()[0] * .500) // listening to the 2nd band
		.out()

	/*h.src(h.o0)
		.negate(h.noise(0.2, 0.1)
			.color(0.0, 1.0, 0.5)
			.rotate(0.1, 0.1)
			.modulate(h.noise(0.1, 0.1), 0.1).brightness(.2))
		.scroll(()=> fft!.analyze()[1],()=>fft!.analyze()[0])
		.layer(h.noise(9).sub(h.osc(5,.1,2)).luma(.1,.01))
		.scale(0.9)
		//.scale("0.8+st.x*0.2")
		.rotate(0,0.1)
		.brightness(.01)
		.out()*/

	h.src(h.o0)
		.rotate(0.9, 0.1)
		.scale(43)
		.blend(h.src(h.o0).brightness(-.02), .4)
		.modulateHue(h.o0, () => fft!.analyze()[0] * 10)
		.modulateHue(h.o0, () => fft!.getEnergy("bass") * .5)
		.layer(h.s0)
		.out(h.o0)

/*
	h.src(h.s0)
		.add(h.src(h.o0).scale(1), .9)
		.modulateScale(h.noise(100), .01)
		.out(h.o0)


	h.noise(2)
		.color(0.9, 0.9, 1)
		.modulate(h.o0, () => fft!.analyze()[1] * .5) // listening to the 2nd band
		.out(h.o0);

	h.render(h.o0);
*/
	h.src(h.o0)
		.rotate(0.9, 0.1)
		.scale(1)
		.blend(h.src(h.o0).brightness(-.02), .4)
		.modulateHue(h.o0, () => fft!.analyze()[0] * 10)
		.modulateHue(h.o0, () => fft!.getEnergy("bass") * .5)
		.layer(h.s0)
		.out(h.o0)
};

export default BitRainEffect;