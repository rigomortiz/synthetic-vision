import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import FontManager from "../src/managers/FontManager";
import {FontPaths} from "../src/enums/Fonts";
import SyntheticVisionAbstract from "../src/SyntheticVisionAbstract";

/*
const atomicBombEffect = (p: p5, h: Hydra) => {
	let explosionRadius = 0;
	let explosionSpeed = 5;
	let maxRadius: number;
	let explosionColor: p5.Color;

	let sound: p5.SoundFile;

	let fft: p5.FFT | undefined;
	let analyzer: p5.Amplitude | undefined;

	p.preload = () => {
		FontManager.preloadFonts(p, FontPaths);
		SoundManager.preloadSounds(p, SoundPaths);
	}

	p.setup = () => {
		let canvas = p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
		maxRadius = p.width / 2;
		explosionColor = p.color(255, 150, 0);
		p.noLoop();
		h.s0.init({src: canvas.elt});

		sound = SoundManager.getSound(Sounds.NoFuture);
		// @ts-ignore
		fft = new p.constructor.FFT();
		sound.connect(fft);
		// @ts-ignore

		analyzer = new p.constructor.Amplitude();
		analyzer!.setInput(sound);
	};

	p.draw = () => {
		let level = analyzer!.getLevel();
		let waveform = fft!.waveform();
		p.clear()
		p.camera(200, -200, 600);

		p.noStroke();
		p.ambientLight(128);
		let locX = p.mouseX - p.width / 2;
		let locY = p.mouseY - p.height / 2;
		p.pointLight(255, 255, 255, locX, locY, 100);
		// normal material shows the geometry normals
		p.normalMaterial();
		// ambient materials reflect under any light
		p.ambientMaterial(255, 0, 0);
		// emissive materials show the same color regardless of light
		p.emissiveMaterial(0, 255, 0);
		// specular materials reflect the color of the light source
		// and can vary in 'shininess'
		p.shininess(10);
		p.specularMaterial(0, 0, 255);
		// box(50);

		//p.background(0);
		//p.fill(explosionColor);

		p.stroke(255, 0, 0);
		p.strokeWeight(4);
		let explosionRadius = p.map(level, 0, 0.1, 10, 200);

		if (explosionRadius < maxRadius) {
			explosionRadius += explosionSpeed;
		} else {
			explosionRadius = 0;
		}

		p.push();
		p.translate(0, 0, -explosionRadius);
		p.sphere(explosionRadius);
		p.pop();

		p.push();
		p.translate(0, 0, explosionRadius);
		p.sphere(explosionRadius);
		p.pop();


	};

};
*/
class AtommicBombSV extends SyntheticVisionAbstract {
	explosionRadius = 0;
	explosionSpeed = 5;
	maxRadius: number = 0;
	explosionColor: p5.Color | undefined;
	t = 0;

	preload(p: p5): void {
		FontManager.preloadFonts(p, FontPaths);
	}

	setup(p: p5, h: Hydra): void {
		this.maxRadius = p.width / 2;
		this.explosionColor = p.color(255, 150, 0);
	}

	draw(p: p5): void {
		let level = this.amplitude!.getLevel();
		let waveform = this.fft!.waveform();
		let explosionRadius = p.map(level, 0, 0.1, 100, 1000);

		let locX = p.mouseX - p.width / 2;
		let locY = p.mouseY - p.height / 2;
		p.clear()
		p.orbitControl(3);
		p.rotate(p.frameCount * 0.01, [1, 1, 1]);
		p.noStroke();
		p.ambientLight(128);
		p.pointLight(255, 255, 255, locX, locY, 100);
		// normal material shows the geometry normals
		p.normalMaterial();
		// ambient materials reflect under any light
		p.ambientMaterial(255, 0, 0);
		// emissive materials show the same color regardless of light
		p.emissiveMaterial(0, 255, 0);
		// specular materials reflect the color of the light source
		// and can vary in 'shininess'
		p.shininess(10);
		p.specularMaterial(0, 0, 255);
		// box(50);
		p.fill(this.explosionColor!);

		p.push();
		p.translate(0, 0, -100);
		p.sphere(explosionRadius);
		p.pop();


		p.stroke(this.explosionColor!);
		p.noFill();
		p.strokeWeight(.2);
		for(let j=-1;j<1;j+=.1){
			p.beginShape();
			for(let i=-p.PI; i<=p.PI; i +=p.PI/100)
				p.vertex(i * 100, j * 100, p.sin(i + this.t) * 100);
			p.endShape();
		}
		/*
		for(let i=- p.PI; i<p.PI; i+= p.PI/100){
			p.beginShape();
			for(let j=-1; j<1; j+=.1)
				p.vertex(i * 100, j * 100, p.sin(i + this.t) * 100);
			p.endShape();
		}*/
		this.t += p.PI/200;

	}

	hydra(h: Hydra, p: p5, active: boolean): void {
		if (!active) return;


		h.src(h.s0)
			.rotate(1.9, 1.1)
			.scale(0.01)
			.modulateScale(h.src(h.o0).scale(1.01), .5)
			.blend(h.src(h.o0).brightness(-.2), 0.4)
			.layer(h.s0)
			.out()

	}

	keyPressed(p: import("p5"), h: Hydra): void {
		throw new Error("Method not implemented.");
	}

	onBackCanva: () => void = () => {
	};

}

export default AtommicBombSV;