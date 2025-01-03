import {MatrixColors} from "../enums/Colors";
import p5 from "p5";

class Nodes {
	private x: number;
	private y: number;
	private z: number;
	private radio: number;
	private _color: string;
	private xSpeed: number;
	private ySpeed: number;
	private zSpeed: number;
	private readonly height: number;
	private readonly width: number;
	private readonly maxX: number;
	private readonly minX: number;
	private readonly maxY: number;
	private readonly minY: number;
	private readonly maxZ: number;
	private readonly minZ: number;
	private readonly distance: number;

	private colors = [MatrixColors.Green_1, MatrixColors.Green_2, MatrixColors.Green_3, MatrixColors.Green_4];

	constructor(p: p5, width: number, height: number) {
		this.width = width;
		this.height = height;
		this.minY = -height/2;
		this.maxY = height/2;
		this.minX = -width/2;
		this.maxX = width/2;
		this.minZ = -p.sqrt(width*height)
		this.maxZ = p.sqrt(width*height);
		this.distance = this.maxZ;
		this.x = p.random(width/2) * p.random([-1, 1]);
		this.y = p.random(height/2) * p.random([-1, 1]);
		//this.z = p.random(p.sqrt(width ** 2 + height ** 2)) * p.random([-1, 1]);
		this.z = p.random(0) * p.random([-1, 1]);
		this.xSpeed = p.random(0, 2) * p.random([-1, 1]);
		this.ySpeed = p.random(0, 2) * p.random([-1, 1]);
		this.zSpeed = p.random(0, 2) * p.random([-1, 1])
		this._color = this.colors[Math.floor(p.random(0, 4))];
		this.radio = p.random(7, 15);
	}


	get color(): string {
		return this._color;
	}

	set color(value: string) {
		this._color = value;
	}


	createParticle(p: p5, radio: number, color: string): void {
		p.fill(color);
		p.translate(this.x, this.y, this.z);
		p.noStroke();
		p.sphere(this.radio + radio);
		p.translate(-this.x, -this.y, -this.z);
	}

	moveParticle(): void {
		if (this.x < this.minX || this.x > this.maxX)
			this.xSpeed *= -1;
		if (this.y < this.minY || this.y > this.maxY)
			this.ySpeed *= -1;
		if (this.z < this.minZ|| this.z > this.maxZ)
			this.z *= -1;

		this.x += this.xSpeed;
		this.y += this.ySpeed;
		this.z += this.zSpeed;
	}

	joinParticles(p: p5, particles: Nodes[]) {
		particles.forEach(element => {
			let dis = p.dist(this.x, this.y, this.z, element.x, element.y, element.z);
			if (dis < this.distance) {
				//p.stroke(this.colors[Math.floor(p.random(0, 4))]);
				p.stroke(MatrixColors.Green_4);
				p.strokeWeight(2)
				p.line(this.x, this.y, this.z, element.x, element.y, element.z);
			}
		});
	}
}

export default Nodes;