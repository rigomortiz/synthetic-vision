import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import SoundManager from "../../src/managers/SoundManager";


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
	urls: string[] = [
	  "http://localhost:3000/ciudad-sin-recuerdos/opera/scenes/1",
	  "http://localhost:3000/ciudad-sin-recuerdos/opera/scenes/2",
	  "http://localhost:3000/ciudad-sin-recuerdos/opera/scenes/3",
	  "http://localhost:3000/ciudad-sin-recuerdos/opera/scenes/4"
	];

	constructor() {
		super(false, "webgl");
	}

	preload(p: p5): void {
		this.shader = p.loadShader('/shaders/shaderRGB.vert', '/shaders/shaderRGB.frag');
		this.img = p.loadImage("/img/ciudad-sin-recuerdos/opera-foto.jpg");
		this.shader = p.loadShader('/shaders/shaderRGB.vert', '/shaders/shaderRGB.frag');
	}

	setup(p: p5, h: Hydra): void {
		p.describe(this.title);
		//this.hide();
		//p.noCursor();
		h.s1.initImage("/img/ciudad-sin-recuerdos/cine-opera-ruinas.png");


	}

	draw(p: p5, h: Hydra): void {
		/*p.orbitControl()
		p.rotateY(p.millis() * 0.0001);
		p.rotateX(p.millis() * 0.0001)
		p.rotateZ(p.millis() * 0.0001)*/
		p.background(0, 0, 0, 10);
		//p.clear()
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
		p.text("@bad_request & @rigomortiz",0,300);


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
			button.mousePressed(() => window.open(this.urls[i], "_blank"));
			this.buttons.push(button);
		}
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

}

export default OperaSV;