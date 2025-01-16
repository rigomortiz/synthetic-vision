import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import {createAudioBufferConstructor} from "standardized-audio-context/build/es2019/factories/audio-buffer-constructor";

const COLORS = [
	"#FF0000",
	"#0000FF",
	"#00FFFF",
	"#FF00FF",
	"#FFFF00",
	"#FFFFFF",
	"#000000",
	"#00FF00",
]

class Jan1SV extends SyntheticVisionAbstract {
	title: string = "A Init";


	constructor() {
		super(true, "p2d");
	}

    preload(p: p5): void {
    }

	setup(p: p5, h: Hydra): void {
		p.describe(this.title);
		//p.pixelDensity(2)
		//p.noStroke()
		/**************************************
		let r = 10;
		let wc = Math.round((p.width / 2)/10) * 10;
		let hc = Math.round((p.height / 2)/10) * 10;

		p.fill(0, 0, 255)
		p.circle(wc, hc, r);

		let n = 6;

		this.drawPattern1(p, wc, hc, n, 1, r, COLORS.YELLOW);
		this.drawPattern1(p, wc, hc, n, 2, r, COLORS.ORANGE);
		this.drawPattern2(p, wc, hc, n, 3, 3, r, [COLORS.BLUE, COLORS.YELLOW]);
		this.drawPattern2(p, wc, hc, n, 4, 2, r, [COLORS.BLUE, COLORS.YELLOW]);
		this.drawPattern3(p, wc, hc, n, 5, 5, 1, r, [COLORS.RED, COLORS.BLUE, COLORS.YELLOW]);
		this.drawPattern3(p, wc, hc, n, 6, 6, 1, r, [COLORS.ORANGE, COLORS.RED, COLORS.BLUE]);
		this.drawPattern3(p, wc, hc, n, 7, 7, 1, r, [COLORS.BLUE, COLORS.ORANGE, COLORS.RED]);
		this.drawPattern3(p, wc, hc, n, 8, 8, 1, r, [COLORS.RED, COLORS.RED, COLORS.ORANGE]);
		this.drawPattern4(p, wc, hc, n, 9, 9, 1, 2, r, [COLORS.ORANGE, COLORS.BLUE, COLORS.RED,  COLORS.YELLOW]);
		this.drawPattern4(p, wc, hc, n, 10, 10, 2, 3, r, [COLORS.BLUE, COLORS.BLUE, COLORS.RED,  COLORS.YELLOW]);
		this.drawPattern4(p, wc, hc, n, 11, 11, 3, 4, r, [COLORS.RED, COLORS.BLUE, COLORS.RED,  COLORS.YELLOW]);
		this.drawPattern4(p, wc, hc, n, 12, 12, 4, 5, r, [COLORS.ORANGE, COLORS.BLUE, COLORS.RED,  COLORS.YELLOW]);
		this.drawPattern4(p, wc, hc, n, 13, 13, 5, 6, r, [COLORS.BLUE, COLORS.BLUE, COLORS.RED,  COLORS.YELLOW]);
		this.drawPattern4(p, wc, hc, n, 14, 14, 6, 7, r, [COLORS.RED, COLORS.BLUE, COLORS.RED,  COLORS.YELLOW]);
		*/
		//this.hide();
		p.noSmooth();
		p.stroke(48);

    }

	draw(p: p5): void {
		p.clear()

		let n = 6;
		let r = 10;
		let wc = Math.round((p.width / 2)/r) * r;
		let hc = Math.round((p.height / 2)/r) * r;
		let a: Array<Array<number>> = new Array<Array<number>>(new Array<number>());
		a[0] = [p.random([0, 1])]
		let d: Array<number> = []
		p.fill(p.color(0, 255, 0))
		p.strokeWeight(.5)
		//p.stroke(0, 255, 0)
		.circle(wc, hc, r);

		for(let l = 1; l < 150; l++) {
			a[l] = new Array<number>(n * l);
			for (let i = 0; i < n * l; i++) {
				let x = wc + Math.cos(p.radians(i * 360 / (n * l))) * r * l;
				let y = hc + Math.sin(p.radians(i * 360 / (n * l))) * r * l;
				a[l][i] = p.random([0, 1, 2, 3]);
				let e = a[l-1][i%l]
				if (e == 1) {
					//p.noStroke()
					//p.stroke(0, 255, 0)
					p.fill(p.color(0, 200, 0))
					p.circle(x, y, r);
				} else {
					//p.noStroke()
					//p.fill(p.color(0, 0, 0))
					//p.stroke(0, 200, 0)
					//p.noStroke()
					p.noFill()
					p.circle(x, y, r);
				}
				p.frameRate(60);
			}
		}
    }

	drawPattern1(p: p5, wc: number, hc: number, n: number, l: number, r: number, color: string): void {
		for(let i = 0; i < n*l; i++) {
			let x = wc + Math.cos(p.radians(i * 360/(n*l))) * 10*l;
			let y = hc + Math.sin(p.radians(i * 360/(n*l))) * 10*l;
			p.fill(color);
			p.circle(x, y, r);
		}
	}

	drawPattern2(p: p5, wc: number, hc: number, n: number, l: number, c: number, r: number, color: [string, string]): void {
		for(let i = 0; i < n*l; i++) {
			let x = wc + Math.cos(p.radians(i * 360/(n*l))) * 10*l;
			let y = hc + Math.sin(p.radians(i * 360/(n*l))) * 10*l;
			if( i % c == 0) {
				p.fill(color[0]);
			} else {
				p.fill(color[1]);
			}
			p.circle(x, y, r);
		}
	}

	drawPattern3(p: p5, wc: number, hc: number, n: number, l: number, c: number, d: number, r: number, color: [string, string, string]): void {
		for(let i = 0; i < n*l; i++) {
			let x = wc + Math.cos(p.radians(i * 360/ (n*l))) * 10*l;
			let y = hc + Math.sin(p.radians(i * 360/ (n*l))) * 10*l;

			if(i % c == 0) {
				p.fill(color[0]);
			} else if( (i+d)%c == 0 || (i-d)%c == 0) {
				p.fill(color[1]);
			} else {
				p.fill(color[2]);
			}
			p.circle(x, y, r);
		}
	}

	drawPattern4(p: p5, wc: number, hc: number, n: number, l: number, c: number, d: number, e: number, r: number, color: [string, string, string, string]): void {
		for(let i = 0; i < n*l; i++) {
			let x = wc + Math.cos(p.radians(i * 360/ (n*l))) * 10*l;
			let y = hc + Math.sin(p.radians(i * 360/ (n*l))) * 10*l;

			if(i % c == 0) {
				p.fill(color[0]);
			} else if( (i+d)%c == 0 || (i-d)%c == 0) {
				p.fill(color[1]);
			} else if( (i+e)%c == 0 || (i-e)%c == 0) {
				p.fill(color[2]);
			}   else {
				p.fill(color[3]);
			}
			p.circle(x, y, r);
		}
		this.drawPattern4
	}

    hydra(h: Hydra, p: p5, active: boolean): void {


    }

    keyPressed(p: p5, h: Hydra): void {
    }

    onBackCanva: () => void = () => {
    };

}

export default Jan1SV;