import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import React, {ComponentType, useCallback, useState} from "react";
import {SyntheticVisionProps} from "../../components/SyntheticVisionWrapper";
import FontManager from "../../src/managers/FontManager";
import {FontPaths, Fonts} from "../../src/enums/Fonts";
import {ColorUtil} from "../../src/utils/ColorUtil";
import CodeMirrorEditor from "../../components/CodeMirrorEditor";
import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";

function glitchTextEfect(p: p5, text: string, x: number, y: number) {
	p.fill(ColorUtil.randomByName("Techno"));
	p.text(text, x + p.random(-5, 5), y + p.random(-5, 5));
}

function drawTextRandomly(p: p5, text: string, x: number, y: number) {
	glitchTextEfect(p, text, x, y);
}

const vision = (p: p5, h: Hydra) => {
	let canvas: p5.Renderer;
	let dia: number;
	let sound: p5.SoundFile;
	let measure: p5.Amplitude;
	let fft: p5.FFT | undefined;
	let analyzer: p5.Amplitude | undefined;
	let mic: p5.AudioIn;

	let explosionRadius = 0;
	let explosionSpeed = 5;
	let maxRadius: number;
	let explosionColor: p5.Color;
	let img: p5.Image;

	p.preload = () => {
		FontManager.preloadFonts(p, FontPaths);
	}

	p.setup = () => {
		canvas = p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
		//sound = SoundManager.getSound(Sounds.NoFuture);
		// crea una entrada de audio
		// @ts-ignore
		mic = new p.constructor.AudioIn();
		mic.start();
		// @ts-ignore
		fft = new p.constructor.FFT();
		//sound.connect(fft);
		mic.connect(fft);
		// @ts-ignore
		analyzer = new p.constructor.Amplitude();
		// @ts-ignore
		measure = new p.constructor.Amplitude()
		//analyzer!.setInput(sound);
		analyzer!.setInput(mic);
		mic.connect(measure);

		//p.background(MatrixColors.Black);
		p.noCursor();
		p.noLoop();
		h.s0.init({src: canvas.elt});
		dia = window.innerWidth / 2;

		explosionColor = p.color(255, 0, 0);

		img = p.loadImage('/img/blue-screen.jpg');



		p.textFont(FontManager.getFont(Fonts.Volunmo));
		p.textSize(250);

		p.describe('A Encrypted Node');

	}

	p.draw = () => {
		p.clear()
		p.lights();
		let level = analyzer!.getLevel();
		let waveform = fft!.waveform();
		let energy = fft!.getEnergy("bass");
		//p.rect(0, 0, p.width, p.height);
		//p.camera(waveform[0]*100, waveform[0]*100, waveform[0]*100, 0, 0, 0, 0, 1, 0);
		p.fill(p.random(0, 255), 0, 0);
		p.sphere(dia);
		p.filter(p.BLUR, 1);
		dia =  dia - 1;
		if (dia < 1) {
			dia = p.width / 2;
		}

		p.beginShape();
		for (let i = 0; i < waveform.length; i++){
			let x = p.map(i, 0, waveform.length, -p.width/2,  p.width/2);
			let y = p.map( waveform[i], -1, 1, -p.height/2, p.height/2);
			p.vertex(x,y, 0);
		}
		p.endShape();

		p.fill(p.mouseX/5, p.mouseY/5, 255, 50)
		p.circle(p.mouseX, p.mouseY, 10)

		let diameter = p.map(level, 0, 1, 10, 200);
		p.sphere(energy);
		p.translate(0, 0, diameter);
		p.translate(0, 0, 200);

		let vol = mic.getLevel();

		// dibuja una elipse con altura según el volumen
		let h = p.map(vol, 0, 1, p.height, 0);
		p.fill(255, 0, 0);
		p.sphere(h);


		p.textAlign(p.CENTER, p.CENTER);
		p.fill(0);
		//p.text("NO FUTURE", 0,0 );

		p.orbitControl(3)
		p.texture(img);
		p.rotateY(p.radians(p.frameCount/3))

		let waveform2 = fft!.waveform();
		p.beginShape();
		p.stroke(20);

		for (let i = 0; i < waveform2.length; i++){
			let x = p.map(i, 0, waveform2.length, 0, p.width);
			let y = p.map( waveform2[i], -1, 1, 0, p.height);
			p.vertex(x,y);
		}
		p.endShape();

		let spectrum2 = fft!.analyze();
		p.fill(255, 0, 0);

		for (let i = 0; i < spectrum2.length; i++) {
			let x = p.map(i, 0, spectrum2.length, 0, p.width);
			let h = - p.height + p.map(spectrum2[i], 0, 0.1, p.height, 0);
			p.rect(x, p.height, p.width / spectrum2.length, h )
		}


		p.orbitControl();
		let amplitude = measure.getLevel() * 1000;
		// Draw the box.
		let angle = p.createVector(1, 1, 0);
		p.rotate(1, angle);
		p.box(amplitude, amplitude, amplitude);




	}

	h.update = () => {
		p.redraw();
	}

	/*
	h.src(h.o0)
		.rotate(0.9, 0.1)
		.scale(43)
		.blend(h.src(h.o0).brightness(-.02), .4)
		.modulateHue(h.o0, () => fft!.analyze()[0] * 10)
		.modulateHue(h.o0, () => fft!.getEnergy("bass") * .5)
		.layer(h.s0)
		.out(h.o0)
		*/

	h.setFunction({
		name: 'myModulator',
		type: 'combineCoord',
		inputs: [],
		glsl: `
        return vec2(_st.x+(_c0.g-_c0.b*0.1),_st.y+(_c0.r*0.2));
    `
	})

	h
		.src(h.o0)
		.rotate(0.1, 0.1)

		.scale(0.01)
		.blend(h.src(h.o0).brightness(-0.1), 0.5)
		.myModulator(h.osc(200,.1,1).diff(h.o0))
		.modulateHue(h.o0, () => fft!.analyze()[0] * .2)
		.modulateHue(h.o0, () => fft!.getEnergy("bass") * .5)
		.modulate(h.o0, () => explosionRadius * 0.01)
		.out(h.o0);

}

const text =
	`El Punk fue al Rock, lo que el Rave fue al Dance,
 dos movimientos en diferentes épocas y lugares pero
  ambos impulsados por ese sentimiento de \"NO FUTURE\" Nihilista.
 Un grito loco de rechazo a ese supuesto progreso que jamás pedimos
  que nos arranca la vida cabando nuestra propia tumba y 
 a la vez construyendo palacios para la clase opresora,
 palacios que jamás podremos habitar aunque sus muros estén levantados a costa de 
 nuestra sangre, NO  FuTuRE, No FuTuRe,
  a menos que que tumbemos esto, al ritmo del martillo y un Kick ponchado
   a cuatro tiempos latiendo en nuestro corazón  "`

const SyntheticVisionWrapper: ComponentType<SyntheticVisionProps> =
	dynamic((): Promise<{default: ComponentType<SyntheticVisionProps>}> => import("../../components/SyntheticVisionWrapper"), {
	ssr: false
})

export default function NoFuturePage() {
	const [code, setCode] = useState("");
	const [vision, setVision] = useState<((p: p5, h: Hydra, sv: SyntheticVisionAbstract) => void)>(() => {});

	const handleCodeChange = useCallback((code: string) => {
		setCode(code);
	}, []);

	return (
		<div>
			<main className={styles.main}>
				<CodeMirrorEditor fileName={fileName} onCodeChange={handleCodeChange} setVision={setVision}/>
				<SyntheticVisionLiveCodingWrapper syntheticVision={introSV} liveCoding={vision}/>
			</main>
		</div>
	);
}
