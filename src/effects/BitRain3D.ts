import * as p5 from "p5";
import {ColorUtil} from "../utils/ColorUtil";

class BitRain3D {
	x: number;
	y: number;
	char: string;
	color: string;

	constructor(p: p5) {
		this.x = p.random(- p.width / 2, p.width / 2);
		this.y = p.random(- p.height / 2, p.height / 2);
		this.char = String.fromCharCode(p.random(0x30, 0x32));
		this.color = ColorUtil.random(ColorUtil.glitch);
	}

	show(p: p5, size: number, speed: number, font: p5.Font, noise: number = 5) {
		let glitchOffsetX = p.random(-noise, noise);
		let glitchOffsetY = p.random(-noise, noise);
		//this.y = (this.y >= p.height) ? 0 : this.y + size;

		if(this.y > p.height/ 2) {
			this.y = -p.height/2;
			this.x = p.random(-p.width/2, p.width/2);
			this.char = String.fromCharCode(p.random(0x30, 0x32));
		} else {
			this.y += speed
		}
		this.color = ColorUtil.random(ColorUtil.glitch);
		p.fill(this.color);
		p.textFont(font);
		p.textSize(size);
		//p.translate(0, 0, size);
		p.text(this.char, this.x + glitchOffsetX, this.y + glitchOffsetY);
	}
}

export default BitRain3D;