import * as p5 from "p5";
import {CyberpunkSynthWaveColors} from "../enums/Colors";

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

class Line3D {
	start: Coordinates3D;
	end: Coordinates3D;

	constructor(start: Coordinates3D, end: Coordinates3D) {
		this.start = start;
		this.end = end;
	}
}

export class Grid3D {
	width: number = 0;
	height: number = 0;
	speed: number = 1;
	color: string = CyberpunkSynthWaveColors.Violet;
	gridSpacing = 50;
	grades = 85;
	strongWeight = 1;
	xAxisLines: Array<Line3D> = new Array<Line3D>();
	yAxisLines: Array<Line3D> = new Array<Line3D>();

	update() {
		this.translateYAxisLines();
		//this.translateXAxisLines();
	}

	setup(width: number, height: number) {
		this.width = width
		this.height = height
		this.createXAxisLines();
		this.createYAxisLines();
	}

	createXAxisLines() {
		for (let i = -this.width; i <= this.width; i+= this.gridSpacing) {
			let coordinatesStart = new Coordinates3D(i, -this.height, 0);
			let coordinatesEnd = new Coordinates3D(i, this.height, 0);
			let line = new Line3D(coordinatesStart, coordinatesEnd);
			this.xAxisLines.push(line);
		}
	}

	createYAxisLines() {
		for (let i = -this.height; i <= this.height; i+= this.gridSpacing) {
			let coordinatesStart = new Coordinates3D(-this.width, i, 0);
			let coordinatesEnd = new Coordinates3D(this.width, i, 0);
			let line = new Line3D(coordinatesStart, coordinatesEnd);
			this.yAxisLines.push(line);
		}
	}

	draw(p: p5) {
		let rotation = p.radians(this.grades);

		p.rotateX(rotation);
		p.stroke(this.color);
		p.strokeWeight(this.strongWeight);

		for (let line of this.xAxisLines) {
			p.line(line.start.x, line.start.y, line.start.z, line.end.x, line.end.y, line.end.z);
		}

		for (let line of this.yAxisLines) {
			p.line(line.start.x, line.start.y, line.start.z, line.end.x, line.end.y, line.end.z);
		}

		p.rotateX(-rotation);
	}

	translateYAxisLines() {
		for (let line of this.yAxisLines) {
			line.start.y += this.speed;
			line.end.y += this.speed;

			if (line.start.y > this.height) {
				line.start.y = -this.height;
				line.end.y = -this.height;
			}
		}
	}

	translateXAxisLines() {
		for (let line of this.xAxisLines) {
			line.start.x += this.speed;
			line.end.x += this.speed;

			if (line.start.x > this.width) {
				line.start.x = -this.width;
				line.end.x = -this.width;
			}
		}
	}
}