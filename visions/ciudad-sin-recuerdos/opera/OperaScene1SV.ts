import SyntheticVisionAbstract from "../../../src/SyntheticVisionAbstract";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import SoundManager from "../../../src/managers/SoundManager";


class OperaScene1SV extends SyntheticVisionAbstract {
	title: string = "Opera Escena 1"
	video: p5.MediaElement | undefined;
	videosSrc: string[] = ["/video/opera.mp4", "/video/opera-2.mp4", "/video/opera-3.mp4"];
	audio: p5.SoundFile | undefined;
	shader: p5.Shader | undefined;
	text =
		"Abrí los ojos y el sistema se instaló dentro de mi.Unas luces incandescentes iluminaban unos barrotes." +
		"Uno a uno pasaban frente de mí,\n me sentía perdido en la realidad." +
		"El brillo de la luz me destellaba a los ojos,\n mis pupilas se dilataban cómo en el efecto de una droga cibernética." +
		"La imagen era más nítida, era como si estuviera viendo a través de un espejo roto,\n era el antiguo teatro de la ciudad." +
		"<<Mi aleción se desvanece como un recuerdo añejo>>\n" +
		"El teatro Ópera, un lugar que había sido testigo de innumerables fracasos" +
		"El sonido de la música rechina en mis oídos, era como si estuviera escuchando una sinfonía de emociones." +
		"El escenario estaba vacío, pero podía sentir la presencia de los artistas que habían estado allí antes." +
		"El olor a polvo y humedad llenaba el aire, era como si el tiempo se hubiera detenido en ese lugar." +
		"Me sentía atrapado en un ciclo interminable de recuerdos y emociones, como si estuviera viviendo una pesadilla." +
		"Pero a pesar de todo, había algo hermoso en esa oscuridad, algo que me hacía sentir vivo.";

	statements: string[] = this.text.split(".");
	currentWordIndex = 0;
	displayText = "";
    timer = 0;
	introActive: boolean = true;
	margin: number = 200;
	secondsPerWord = .8;
	duration = 0;

	constructor() {
		super(true, "webgl");
	}

	preload(p: p5): void {
		this.video = p.createVideo("/video/opera.mp4");
		this.video.hide();
		this.video.showControls();
		this.video.loop();
		this.video.play()
		this.video.volume(0);
		this.sound = p.loadSound("/audio/opera.mp3");

		//this.shader = p.createShader(this.vertexSrc, this.fragmentSrc);
		this.shader = p.loadShader('/shaders/shaderRGB.vert', '/shaders/shaderRGB.frag');

	}

	setup(p: p5, h: Hydra): void {
		p.describe(this.title);
		p.noCursor();
		//p.noStroke()
		//p.normalMaterial();
	    this.fft = this.initFFT(p, "sound");
        this.amplitude = this.initAmplitude(p, "sound");
		h.s1.initVideo("/video/opera.mp4")
	}

	draw(p: p5, h: Hydra): void {
		if (this.introActive) {
			this.intro(p);
		} else {
			this.drawVideo(p, h);
			this.textAnimation(p, h);
		}
	}

	intro(p: p5): void {
		p.textAlign(p.CENTER, p.CENTER);
		p.translate(0, 0, 0);
		p.textFont(this.font("Volunmo"));
		p.textSize(300);
		p.fill(255);
		p.text("despertar",0,0);
		p.textSize(46);
		p.textFont(this.font("Terminus"));
		p.text("ÓPERA"// +        sv.video.time()
		,0,-300);
		p.textSize(32);
		p.text("PRESS ENTER"// +        sv.video.time()
		,0,300);
	}

	textAnimation(p: p5, h: Hydra): void {
		p.textFont(this.font("Terminus"));
		p.textSize(32);
		p.fill(255);



		const currentStatement = this.statements[this.currentWordIndex];
		this.duration = Math.ceil(currentStatement.split(" ").length * this.secondsPerWord * h.bpm/3);
		const elapsedSeconds = Math.floor(p.millis() / 1000);

		if (this.timer === this.duration) {
			this.timer = 0;
			this.currentWordIndex = (this.currentWordIndex + 1) % this.statements.length;
		}

		p.textAlign(p.CENTER, p.CENTER);
		p.text(this.statements[this.currentWordIndex], -p.width / 2 + this.margin, p.height / 2 * 0.7, p.width - this.margin*2);
	}

	drawVideo(p: p5, h: Hydra): void {
		this.timer++;
		p.background(0, 0, 0, 10);
		p.orbitControl();
		p.push();
		p.imageMode(p.CENTER);
		p.image(
		this.video!,
		0, 0, p.width, p.height,
		0, 0, this.video!.width, this.video!.height,
		p.COVER
		);
		//@ts-ignore
        p.filter(this.shader);
		p.pop();
		p.textAlign(p.CENTER, p.CENTER);
		p.textWrap(p.WORD);
		p.textFont(this.font("Terminus"));
		p.textSize(24);
		p.fill(255, 0, 0);
		p.text("Timer " + this.timer + " duration " + this.duration, this.margin - p.width / 2, - p.height / 2 * 0.7, p.width - this.margin * 2);
	}

	hydra(h: Hydra, p: p5, active: boolean): void {
			h.src(h.s1)
		    .layer(h.s1)
	        .color(1, 0, 0)
		    .add(h.src(h.s1).scale(() => 1 - p.sin(h.time *.001)), .001)
            .add(h.src(h.s1).scale(() => 1 + p.sin(h.time *.001)), .001)
			.modulate(h.s1,0.5)
	      .layer(
	        h.src(h.s0)
				.color(0, 1, 1)
	            .modulateScale(h.osc(23).modulateRotate(h.o0,.74))
		       .diff(h.src(h.s1).scale(1).brightness(-.05))
	      ).blend(h.src(h.o0).brightness(.02), -.040)
		    .diff(h.osc(1.000, 2.0, 1.5).scale(1.1))
				.modulateScale(h.noise(.100), .32)
				.mult(h.osc(.10,0.1,()=> Math.tan(this.mic!.getLevel())*6).saturate(3).kaleid(200))
		    .color(0.5, 1, 0.3)
	      .scale(1.1)
	      .out();
	    h.render(h.o0);
	}

	keyPressed(p: p5, h: Hydra): void {
		if (p.keyCode === p.ENTER) {
			if (this.sound && this.video && !this.sound!.isPlaying()) {
				p.clear();
				this.introActive = false;
				//this.hide();
				this.video!.play();
				this.sound!.play();
			}
		}
	}

	onBackCanva: () => void = () => {
	};

	mouseMove(p: p5): void {

	}

}

export default OperaScene1SV;