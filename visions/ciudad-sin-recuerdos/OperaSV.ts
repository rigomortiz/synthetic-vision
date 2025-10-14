// @ts-nocheck
import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import SoundManager from "../../src/managers/SoundManager";
import * as Tone from "tone";
import NoiseEffect from "../../src/effects/NoiseEffect";


class OperaSV extends SyntheticVisionAbstract {
    keyPressed(p: import("p5"), h: Hydra): void {
    }
	title: string = "Opera"
	shader: p5.Shader | undefined;
	button: p5.Element | undefined;
	introActive: boolean = true;
	img: p5.Image | undefined;
	backgroundImg: p5.Image | undefined;
	proportion: number = 0.5;
	buttons: p5.Element[] = [];
	urls: string[] = [];
	amp: p5.Amplitude | undefined;
	pad: p5.Oscillator | undefined;
	lfo: p5.Oscillator | undefined;
	filter: p5.LowPass | undefined;
	filtro: p5.BandPaas | undefined;
	volumen: p5.Gain | undefined;
	osc: p5.Oscillator | undefined;
	drone: p5.Oscillator | undefined;
	noise: p5.Noise | undefined;
	env: p5.Envelope | undefined;
	reverb: p5.Reverb | undefined;
	distortion: p5.Distortion | undefined;
	fft2: p5.FFT | undefined;


	texto = `
		Abrí los ojos y el sistema cargó una nueva capa de realidad.
		Luces incandescentes parpadeaban sobre barrotes virtuales.
		La imagen se agudizaba, era el Teatro Ópera, ruina sagrada de la vieja metrópoli.
		El tiempo no pasaba ahí: se repetía como un loop defectuoso.
		Y sin embargo, había belleza en esa oscuridad.
		`;

	constructor() {
		super(false, "webgl");
	}

	preload(p: p5): void {
		this.shader = p.loadShader('/shaders/shaderRGB.vert', '/shaders/shaderRGB.frag');
		this.img = p.loadImage("/img/ciudad-sin-recuerdos/opera-foto.jpg");
		this.shader = p.loadShader('/shaders/shaderRGB.vert', '/shaders/shaderRGB.frag');
		this.urls = [
			p.getURL() + "/scenes/1", p.getURL() + "/scenes/2", p.getURL() + "/scenes/3", p.getURL() + "/scenes/4"
		]
	}

	setup(p: p5, h: Hydra): void {
		p.describe(this.title);
		//this.hide();
		//p.noCursor();
		h.s1.initImage("/img/ciudad-sin-recuerdos/cine-opera-ruinas.png");
		alert("Esta obra contiene elementos visuales y sonoros que pueden ser intensos. Si tienes alguna condición médica, por favor consulta con un profesional antes de continuar.\n");


		this.startSound(p)
		//this.initSound(p);



		// Analizador de amplitud para visuales
		//this.amplitude = new p.constructor.Amplitude();


		setTimeout(() => this.hablar("Esta obra contiene elementos visuales y sonoros que pueden ser intensos. Si tienes alguna condición médica, por favor consulta con un profesional antes de continuar."), 2000); // Hablar después de 2 segundos

	}

	draw(p: p5, h: Hydra): void {
		//p.lights()
        //p.orbitControl();
		/*p.orbitControl()
		p.rotateY(p.millis() * 0.0001);
		p.rotateX(p.millis() * 0.0001)
		p.rotateZ(p.millis() * 0.0001)*/
		p.background(0, 0, 0, 10);
		p.clear()


		p.image(this.img!, -this.img!.width*this.proportion/2, -this.img!.height*this.proportion/2, this.img!.width*this.proportion, this.img!.height*this.proportion);
		// @ts-ignore
		p.filter(this.shader);
		p.textAlign(p.CENTER, p.CENTER);
		p.translate(0, 0, 0);
		p.textFont(this.font("Volunmo"));
		p.textSize(300);
		p.fill(255);
		p.text("ÓPERA",0,0);
		p.textSize(46);
		p.textFont(this.font("Terminus"));
		p.text("Sinfonía audiovisual",0,-300);
		p.textSize(32);
		p.text("@rigomortiz",0,300);


		let buttonWidth = 150;
		let buttonHeight = 50;
		let spacing = 200;

		for (let i = 0; i < this.urls.length; i++) {
			let y = p.height - 100;
			let x = p.width/2 - (this.urls.length * buttonWidth + (this.urls.length - 1) * spacing) / 2 + i * (buttonWidth + spacing);

			let button = p.createButton(`Escena ${i + 1}`);
			button.position(x, y);
			button.size(buttonWidth, buttonHeight);
			button.style("font-size", "16px");
			button.style("background-color", "#333");
			button.style("color", "#fff");
			button.style("border", "none");
			button.style("border-radius", "5px");
			button.style("cursor", "pointer");
			button.style("padding", "10px 20px");
			button.style("box-shadow", "0 2px 4px rgba(0, 0, 0, 0.2)");
			button.style("font-family", "Terminus, monospace");
			button.style("z-index", "1000");
			button.mouseOver(() => {
				button.style("background-color", "#555");
			});
			button.mouseOut(() => {
				button.style("background-color", "#333");
			});
			button.mousePressed(() =>
			{
				p.userStartAudio();
				this.hablar("Cargando recuerdo " + (i + 1));
				//this.pad.start();
				this.drone.start();
				this.pad.start();
				//this.osc.start();
				//this.noise.start();
				//this.drone.start();
			}
			);
			this.buttons.push(button);
		}



       // p.background(Math.abs(waveform[0] * 255), Math.abs(waveform[1] * 255), Math.abs(waveform[2] * 255), 100);
		let level = this.amplitude!.getLevel();
        let waveform = this.fft!.waveform();
		this.wave(p, waveform)

	}

	intro(p: p5): void {
		//p.background(0);
		p.textFont(this.font("Terminus"));
		p.textAlign(p.CENTER, p.CENTER)
		p.textSize(128);
		p.fill(255);
		p.text("PRESS ENTER",0,0);
	}

	hydra(h: Hydra, p: p5, active: boolean): void {
	    h.src(h.s1)
		    .layer(h.s1)
	        .color(1, 0, 0)
		    .add(h.src(h.s1).scale(() => 1 - p.tan(h.time *.001)), .001)
            .add(h.src(h.s1).scale(() => 1 + p.tan(h.time *.001)), .001)
            .modulateScale(h.noise(100), 1)
	      .layer(
	        h.src(h.s0)
				.color(0, 1, 1)
	            .modulateScale(h.osc(23).modulateRotate(h.o0,.74))
		       .diff(h.src(h.s1).scale(1).brightness(-.05))
	      ).blend(h.src(h.o0).brightness(.02), -.040)
		    .diff(h.osc(1.000, 2.0, 1.5).scale(1.4))
		    .color(1, 0.3, 0.3)
	      .scale(1.3)
	      .out();

	    h.render(h.o0);
	}

	onBackCanva: () => void = () => {
	};

	mouseMove(p: p5): void {

	}

	 startArcadeMelody() {
        const synth = new Tone.Synth().toDestination();
        const melody = new Tone.Sequence(
            (time, note) => {
                synth.triggerAttackRelease(note, "8n", time);
            },
            ["C4", "E4", "G4", "B4", "C5", "B4", "G4", "E4"],
            "4n"
        );

        Tone.Transport.bpm.value = 120;
        melody.start(0);
    }

	startTechnoIndustrialSound() {
        const synth = new Tone.Synth({
            oscillator: {
                type: "sawtooth"
            },
            envelope: {
                attack: 0.01,
                decay: 0.2,
                sustain: 0.5,
                release: 1
            }
        }).toDestination();

        const filter = new Tone.Filter({
            type: "lowpass",
            frequency: 800,
            rolloff: -24,
            Q: 15
        }).toDestination();

        synth.connect(filter);

        const notes = ["E2", "G2", "A2", "B2", "D3", "E3", "G3", "A3", "B3", "D4", "E4", "G4", "A4", "B4", "D5", "E5"];
        const melody = new Tone.Sequence(
            (time, note) => {
                synth.triggerAttackRelease(note, "8n", time);
            },
            notes,
            "4n"
        );

        Tone.Transport.bpm.value = 190; // Set the tempo
        melody.start(0);
        Tone.Transport.start();
        Tone.Transport.start();
    }
	 playShortCircuitSound() {
        const noise = new Tone.Noise("white").start();
        const filter = new Tone.Filter(800, "highpass").toDestination();
        const envelope = new Tone.AmplitudeEnvelope({
            attack: 0.01,
            decay: 0.1,
            sustain: 0,
            release: 0.1
        }).toDestination();

        noise.connect(filter);
        filter.connect(envelope);
        envelope.triggerAttackRelease(0.1);

        setTimeout(() => {
            noise.dispose();
            filter.dispose();
            envelope.dispose();
        }, 100);
    }

	demo() {
		const player = new Tone.Player({
			url: "https://tonejs.github.io/audio/berklee/gurgling_theremin_1.mp3",
			loop: true,
			autostart: true,
		});
		//create a distortion effect
		const distortion = new Tone.Distortion(0.4).toDestination();
		//connect a player to the distortion
		player.connect(distortion);
	}

	soundTone(): void {
		//Tone.start();
		console.log("context started");
        const noise = new Tone.Noise("white").start();
        const filter = new Tone.Filter(800, "highpass").toDestination();
        const envelope = new Tone.AmplitudeEnvelope({
            attack: 0.01,
            decay: 0.1,
            sustain: 0,
            release: 0.1
        }).toDestination();

        noise.connect(filter);
        filter.connect(envelope);
        envelope.triggerAttackRelease(0.1);

        setTimeout(() => {
            noise.dispose();
            filter.dispose();
            envelope.dispose();
        }, 500);
    }

	initSound(p: p5): void {
		this.osc = new p.constructor.Oscillator('sine');
		this.osc.freq(60);
		this.osc.amp(0.2);

		// Ruido glitch
		this.noise = new p.constructor.Noise('pink');
		this.noise.amp(0.05);

		// Reverb y distorsión
		this.reverb = new p.constructor.Reverb();
		this.distortion = new p.constructor.Distortion(0.5);

		this.osc.disconnect();
		this.noise.disconnect();

		this.osc.connect(this.distortion);
		this.noise.connect(this.distortion);

		this.distortion.connect(this.reverb);
		this.reverb.process(this.distortion, 6, 0.9); // decay, wet



	}

	startSound(p: p5): void {
		// Oscilador base (pad oscuro)
		  // @ts-ignore
		  this.pad = new p.constructor.Oscillator("sine");
		  this.pad.freq(55); // Frecuencia A1
		  this.pad.amp(0.3);

		  // @ts-ignore
		  this.osc = new p.constructor.Oscillator('sine');
			this.osc.freq(60);
			this.osc.amp(0.2);


		  // Filtro lowpass
		  // @ts-ignore
		  this.filter = new p.constructor.LowPass();
		  this.filter.freq(400);

		  // Reverb
		  // @ts-ignore
		  this.reverb = new p.constructor.Reverb();
		  this.reverb.process(this.filter, 8, 0.7); // Decay y wet

		  this.pad.disconnect();
		  this.pad.connect(this.filter);

		  // LFO para modular el filtro
		  // @ts-ignore
		  this.lfo = new p.constructor.Oscillator("sine");
		  this.lfo.freq(33); // Frecuencia de modulación
		  this.lfo.amp(10);
		  this.lfo.start();
		  this.lfo.disconnect();
		  this.lfo.connect(this.filter._freq);

		  // Ruido glitch
		  // @ts-ignore
		  this.noise = new p.constructor.Noise("pink");
		  this.noise.amp(0.05);

		  this.filtro = new p.constructor.BandPass();

		  this.distortion = new p.constructor.Distortion(0.8);
		  this.noise.disconnect();
		  this.noise.connect(this.distortion);
		  this.distortion.connect(this.filter);

		  // Loop de glitches aleatorios
		  setInterval(() => {
		    const duration = p.random(100, 500); // Duración aleatoria en ms
		    this.noise.start();

		    setTimeout(() => this.noise.stop(), duration);
		  }, p.random(5000, 10000));

		  // Loop de tono mecánico
		  this.drone = new p.constructor.Oscillator("sine");
		  this.drone.freq(32); // Frecuencia C1
		  this.drone.amp(0.2);

		  this.amp = new p.constructor.Amplitude();
		  this.volumen = new p.constructor.Gain();
		  this.volumen.amp(0.1);


			this.fft2 = new p.constructor!.FFT();
			this.noise.connect(this.fft2);

			//this.noise.start()

	}

	hablar(texto: string) {
	  const msg = new SpeechSynthesisUtterance(texto);
	  msg.lang = "es-MX";
	  msg.rate = 0.9;
	  msg.pitch = 0.8;
	  msg.volume = 1;
	  msg.voice = speechSynthesis.getVoices().find(v => v.name.includes("Google") || v.lang === "es-MX" || v.name.includes("Español")) || speechSynthesis.getVoices()[0];
	  console.log(msg);
	  speechSynthesis.speak(msg);
	}

	wave(p: p5, waveform: any) {
		let w: number = (p.width) / waveform.length;
		p.push();
	    p.beginShape();
	    p.noFill();
	    p.strokeWeight(3)
	    p.stroke("#00ff00");
	    let x: number = -p.width / 2 ;
	    for (let i = 0; i < waveform.length; i++) {
	      let y = p.map(waveform[i], -1, 1, -p.height/10, p.height/10);
	      //p.vertex(x + i * w, waveform[i] * 150, 0)
	      p.vertex(x + i * w, y);
	    }
	    p.endShape();
		p.pop();
	}
}

export default OperaSV;