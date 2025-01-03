import * as p5 from "p5";
import {ColorUtil} from "../utils/ColorUtil";
import {MatrixColors} from "../enums/Colors";

class Coordinates3D {
	x: number;
	y: number;
	z: number;

	constructor(x: number, y: number, z: number) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
}

class Drop3D {
	start: Coordinates3D;
	end: Coordinates3D;
	speed: number;
	color: string;
	length: number;

	constructor(start: Coordinates3D, end: Coordinates3D, speed: number, color: string, length: number) {
		this.start = start;
		this.end = end;
		this.speed = speed;
		this.color = color;
		this.length = length;
	}
}

class AcidRain {
	width: number = 0;
	height: number = 0;
	length: number = 50;
	number: number = 200;
	degree: number = 180;
	drops: Array<Drop3D> = new Array<Drop3D>();

	update(speed: number) {
		for (let drop of this.drops) {
			drop.start.y += drop.speed * speed;
			drop.end.y += drop.speed * speed;

			if (drop.start.y > this.height / 2) {
				drop.start.y = -this.height / 2;
				drop.end.y = -this.height / 2 + drop.length;
			}
		}
	}

	draw(p: p5) {
		let rotation = p.radians(this.degree);
		p.rotateY(rotation);

		for (let drop of this.drops) {
			p.stroke(drop.color);
			p.strokeWeight(2)
			p.line(drop.start.x, drop.start.y, drop.start.z, drop.end.x, drop.end.y, drop.end.z);
		}

		p.rotateY(-rotation);
	}

	setup(p: p5, width: number, height: number) {
		this.width = width;
		this.height = height;
		for (let i = 0; i < this.number; i++) {
			let x = p.random(width / 2) * p.random([-1, 1]);
			let y = p.random(height / 2) * p.random([-1, 1]);
			let z = p.random(p.sqrt(width ** 2 + height ** 2)) * p.random([-1, 1]);
			let speed = p.random(5, 10);
			let length = p.random(20, 50);
			let color = ColorUtil.random([MatrixColors.Green_1, MatrixColors.Green_2, MatrixColors.Green_3, MatrixColors.Green_4])
			let coordinates = new Coordinates3D(x, y, z);
			let coordinates2 = new Coordinates3D(x, y + length, z);
			let drop = new Drop3D(coordinates, coordinates2, speed, color, length);
			this.drops.push(drop);
		}

	}
}

export default AcidRain;