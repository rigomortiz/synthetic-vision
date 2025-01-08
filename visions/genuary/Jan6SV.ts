import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";

const COLORS = {
	DARK_GREEN: '#0B3D0B',
	LIGHT_GREEN: '#00FF00',
	YELLOW: '#FFFF00',
	ORANGE: '#FFA500',
	RED: '#FF0000',
	BLUE: '#0000FF',
	WHITE: '#FFFFFF',
	BLACK: '#000000'
};

class Node {
	x: number;
	y: number;
	radius: number;
	connected: boolean;

	constructor(x: number, y: number, radius: number, connected: boolean) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.connected = connected
	}

	draw(p: p5): void {
		if (this.connected) {
			p.fill(COLORS.ORANGE);
			p.stroke(10)
			p.strokeWeight(2)
			p.circle(this.x, this.y, this.radius * 2);
		}

	}
}

class Chip {
	x: number;
	y: number;
	size: number;
	nodesCount: number;
	nodeSize: number;
	nodesInput: Node[];
	nodesOutput: Node[];
	lines: Node[][];

	constructor(p: p5, x: number, y: number, size: number, nodesCount: number, nodeSize: number) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.nodesCount = nodesCount;
		this.nodeSize = nodeSize;
		this.nodesInput = [];
		this.nodesOutput = [];
		this.lines = [];

		// Initialize nodes as Node
		for (let i = 0; i < this.nodesCount; i++) {
			//if (i<5 || i>35) continue

			let nodeUpInput = new Node(this.x + this.nodeSize + i * this.nodeSize * 2, this.y - this.nodeSize, this.nodeSize, true);
			let nodeUpOutput = new Node(this.x + this.nodeSize + i * this.nodeSize * 2, p.random(-this.size, this.y - this.size / 3), this.nodeSize, p.random([true, false]));


			let nodeDownInput = new Node(this.x + this.nodeSize + i * this.nodeSize * 2, this.y + this.size + this.nodeSize, this.nodeSize, true);
			let nodeDownOutput = new Node(this.x + this.nodeSize + i * this.nodeSize * 2, p.random(this.y + this.size + this.size / 3, p.height + this.size), this.nodeSize, p.random([true, false]));


			let nodeLeftInput = new Node(this.x - this.nodeSize, this.y + i * this.nodeSize * 2 + this.nodeSize, this.nodeSize, true);
			let nodeLeftOutput = new Node(p.random(-this.size, this.x - this.size / 3), this.y + i * this.nodeSize * 2 + this.nodeSize, this.nodeSize, p.random([true, false]));


			let nodeRightInput = new Node(this.x + this.size + this.nodeSize, this.y + i * this.nodeSize * 2 + this.nodeSize, this.nodeSize, true);
			let nodeRightOutput = new Node(p.random(this.x + this.size + this.size / 3, p.width + this.size), this.y + i * this.nodeSize * 2 + this.nodeSize, this.nodeSize, p.random([true, false]));

			this.nodesInput.push(nodeUpInput);
			this.nodesInput.push(nodeDownInput);
			this.nodesInput.push(nodeLeftInput);
			this.nodesInput.push(nodeRightInput);


			this.nodesOutput.push(nodeUpOutput);
			this.nodesOutput.push(nodeDownOutput);
			this.nodesOutput.push(nodeLeftOutput);
			this.nodesOutput.push(nodeRightOutput);
			this.lines.push([nodeUpInput, nodeUpOutput]);
			this.lines.push([nodeDownInput, nodeDownOutput]);
			this.lines.push([nodeLeftInput, nodeLeftOutput]);
			this.lines.push([nodeRightInput, nodeRightOutput]);
		}
	}

	draw(p: p5): void {
		p.fill(0, 0, 0, 10);
		p.rect(this.x, this.y, this.size, this.size);

		for (let node of this.nodesInput) {
			p.fill(COLORS.LIGHT_GREEN);
			p.stroke(10)
			p.strokeWeight(2)
			node.draw(p);
		}

		for (let node of this.nodesOutput) {
			node.draw(p);
		}

		for (let line of this.lines) {
			if (line[0].connected && line[1].connected) {
				p.stroke(COLORS.YELLOW);
				p.strokeWeight(1)
				p.line(line[0].x, line[0].y, line[1].x, line[1].y);
			} else {
				//p.stroke(COLORS.DARK_GREEN);
				//p.strokeWeight(5)
				//p.line(line[0].x, line[0].y, line[1].x, line[1].y);
			}

		}

		p.stroke(COLORS.BLACK)
		p.strokeWeight(2)
		p.line(this.x, this.y, this.x, this.y + this.size);
		p.line(this.x, this.y, this.x + this.size, this.y);
		p.line(this.x + this.size, this.y, this.x + this.size, this.y + this.size);
		p.line(this.x, this.y + this.size, this.x + this.size, this.y + this.size);

	}
}

class Jan5SV extends SyntheticVisionAbstract {
	title: string = "Isometric Art (No vanishing points)."
	chip1: Chip | undefined;
	chip2: Chip | undefined;

	constructor() {
		super(true, "p2d");
	}

	preload(p: p5): void {

	}

	setup(p: p5, h: Hydra): void {
		p.stroke(255);
		let size = 400;
		let centerX = p.width / 2;
		let centerY = p.height / 2;
		this.chip1 = new Chip(p, centerX - 300, centerY - 300, size, 40, 5);
		this.chip2 = new Chip(p, centerX - 100, centerY - 100, size, 40, 5);
	}

	draw(p: p5): void {
		p.clear();
		this.drawBackground(p);
		this.chip1!.draw(p);
		this.chip2!.draw(p);
		this.drawNodes(p);
	}


	hydra(h: Hydra, p: p5, active: boolean): void {
		h.src(h.s0)
			.scale(1.05)
			.mult(h.osc(0.1, 0.1, () => Math.tan(h.time)).saturate(100).kaleid(100))
			.modulate(h.o0, 0.001)
			.add(h.o0, 0.001)
			.modulate(h.noise(() => Math.tan(h.time), () => Math.tan(h.time)), 0.001)
			.blend(h.src(h.o0).brightness(-.02), .4)
			.layer(h.s0)
			.modulateScale(h.noise(10), .01)
			.out(h.o0)
	}

	drawBackground(p: p5): void {
		p.stroke(COLORS.BLACK);
		p.strokeWeight(.4);
		for (let x = 0; x < p.width; x += 5) {
			p.line(x, 0, x, p.height);
		}
		for (let y = 0; y < p.height; y += 5) {
			p.line(0, y, p.width, y);
		}
	}

	drawNodes(p: p5): void {
		for (let i = 0; i < this.chip1!.nodesInput.length; i++) {
			let node1Input = this.chip1!.nodesInput[i];
			let node2Input = this.chip2!.nodesInput[i];
			let node1Output = this.chip1!.nodesOutput[i];
			let node2Output = this.chip2!.nodesOutput[i];
			p.noFill()
			p.strokeWeight(.3)
			p.rect(node1Output.x, node1Output.y, node2Output.x, node2Output.y);
			p.stroke(COLORS.DARK_GREEN);
			p.line(node1Input.x, node1Input.y, node2Input.x, node2Input.y);
		}
	}

	keyPressed(p: p5, h: Hydra): void {
	}

	onBackCanva: () => void = () => {
	};

}

export default Jan5SV;