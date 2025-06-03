import SyntheticVisionAbstract from "../../../src/SyntheticVisionAbstract";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";


class OperaScene3SV extends SyntheticVisionAbstract {
	title: string = "Opera Escena 3"
	video: p5.MediaElement | undefined;
	audio: p5.SoundFile | undefined;
	shader: p5.Shader | undefined;
	text = "";

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
		this.video = p.createVideo("/video/opera-3.mp4");
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
		h.s1.initVideo("/video/opera-3.mp4")
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
		p.text("Scene 3",0,0);
		p.textSize(46);
		p.textFont(this.font("Terminus"));
		p.text("ÓPERA",0,-300);
		p.textSize(32);
		p.text("PRESS ENTER",0,300);
	}

	textAnimation(p: p5, h: Hydra): void {
		p.textFont(this.font("Terminus"));
		p.textSize(32);
		p.fill(255);



		const currentStatement = this.statements[this.currentWordIndex];
		this.duration = Math.ceil(currentStatement.split(" ").length * this.secondsPerWord * h.bpm/5);
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
		 p.tint(255, 150);
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
		h.setFunction({
		    name: 'myModulator',
		    type: 'combineCoord',
		    inputs: [],
		    glsl: `
		        return vec2(_st.x+(_c0.g-_c0.b*0.001),
		        _st.y+(_c0.r*0.02));
		    `
		})
			h.src(h.s0)
		        .layer(h.s0)
	            .color(1, 1, 1)
				.myModulator(h.src(h.s0))
		        //.add(h.src(h.s0).scale(() => p.cos(h.time *.001) + p.sin(h.time *.001) * p.sin(h.time *.001)), .01)
	      .layer(
	        h.src(h.s0)
				.color(.5, 0, .5)
	          //  .modulateScale(h.osc(43).modulateRotate(h.s0,.54))
		        .myModulator(h.src(h.s0))
		       .diff(h.src(h.s0).scale(1.5).brightness(-.077))

	      ).blend(h.src(h.o0).brightness(.02), -.040)
		    .diff(h.osc(1.33, 2.0, 1.5).scale(1.3))
			//	.modulateScale(h.noise(.100), .32)
				//.mult(h.osc(.10,0.1,()=> Math.tan(this.mic!.getLevel())*6).modulate(h.noise(3), 0.5))
		    .color(1, 0.1, 0.1)
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

export default OperaScene3SV;