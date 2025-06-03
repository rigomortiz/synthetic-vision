import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";

class Jan6SV extends SyntheticVisionAbstract {
    mouseMove(p: import("p5")): void {
        throw new Error("Method not implemented.");
    }
	title: string = "Make a landscape using only primitive shapes.";
	text: [string, string, string, string] = [
		"INTRODUCTION",
		"SPACE IS BIG. REALLY IS BIG.",
		"YOU JUST WON'T BELIEVE HOW VASTLY, HUGELY,",
		"MIND-BOGGLINGLY BIG IT IS"
	]
	COLORS: { [key: string]: string } = {
		CYAN: '#00FFFF',
		MAGENTA: '#FF00FF',
		BLUE: '#0000FF',
		ELECTRIC_BLUE: '#7DF9FF',
		NEON_PINK: '#FF6EC7',
		NEON_GREEN: '#39FF14',
		DARK_GREEN: '#0B3D0B',
		GRAY: '#808080',
		NEON_YELLOW: '#FFFF33',
		PURPLE: '#800080',
		WHITE: '#FFFFFF',
		RED: '#FF0000',
		GREEN: '#00FF00',
		BLACK: "#000000"
	};
	angle: number = 1;
	c: number = 1
	x: number = 0;
	y: number = 0;
	cubeSize: number = 0;
	planetSize: number = 0;
	satelliteSize: number = 0;
	ellipseHeight: number = 0;
	ellipseWidth: number = 0;
	semiMajorAxis: number = 0;
	semiMinorAxis: number = 0;


	constructor() {
		super(true, "webgl");
	}

	preload(p: p5): void {
	}

	setup(p: p5, h: Hydra): void {
		p.debugMode();
		p.pixelDensity(1)
		p.camera(-p.width / 2, -p.height / 2, p.sqrt(p.height * p.height + p.width * p.width) / 2, 0, 0, 0, 0, 1, 0);
		p.angleMode(p.DEGREES);

		this.cubeSize = p.sqrt(p.height * p.height + p.width * p.width) / 4;
		this.planetSize = this.cubeSize / 12;
		this.satelliteSize = this.planetSize / 7;
		this.ellipseHeight = this.cubeSize
		this.ellipseWidth = this.ellipseHeight / 2
		this.semiMajorAxis = this.ellipseHeight / 2;
		this.semiMinorAxis = this.ellipseWidth / 2;
	}

	draw(p: p5, h: Hydra): void {
		p.clear();
		p.background(0, 0, 0, 150);
		p.orbitControl();
		this.drawText(p, this.text, 0, 0);
		p.rotateY(p.millis() * 0.01);
		p.rotateX(p.millis() * 0.01)
		p.rotateZ(p.millis() * 0.01)
		this.drawCube(p, 0, 0, 0, this.cubeSize, this.COLORS.RED);
		this.drawPlanet(p, 0, 0, 0, this.planetSize);
		this.drawOrbite(p, 0, 0, 0, this.ellipseWidth, this.ellipseHeight, this.COLORS.ELECTRIC_BLUE);
		this.drawSatelliteInOrbite(p, this.angle, this.semiMinorAxis, this.semiMajorAxis, this.satelliteSize, this.COLORS.NEON_PINK)
		p.stroke(this.COLORS.NEON_GREEN)
		this.calculateAngle()
	}

	calculateAngle(): void {
		if (this.angle >= 360 / 2 || this.angle <= 0)
			this.c = this.c * -1
		this.angle += 10 * this.c;
	}

	drawCube(p: p5, x: number, y: number, z: number, size: number, color: string): void {
		p.push();
		p.strokeWeight(10)
		p.stroke(color);
		p.noFill()
		p.translate(x, y, z);
		p.box(size);
		p.pop();
	}

	drawPlanet(p: p5, x: number, y: number, z: number, size: number): void {
		p.push();
		p.noStroke()
		p.ambientLight(128);
		p.pointLight(255, 255, 255, this.x, this.y, 0);
		// normal material shows the geometry normals
		p.normalMaterial();
		// ambient materials reflect under any light
		p.ambientMaterial(255, 0, 0);
		// emissive materials show the same color regardless of light
		p.emissiveMaterial(0, 255, 0);
		// specular materials reflect the color of the light source
		// and can vary in 'shininess'
		p.shininess(10);
		p.specularMaterial(0, 255, 0);
		p.translate(x, y, z);
		p.sphere(size);
		p.pop();
	}

	drawOrbite(p: p5, x: number, y: number, z: number, w: number, h: number, color: string): void {
		p.push();
		p.noFill();
		p.strokeWeight(5)
		p.stroke(color);
		p.translate(x, y, z);
		p.rotateY(45);
		p.rotateX(-45);
		p.rotateZ(45);
		p.ellipse(0, 0, w, h);
		p.pop();
	}

	drawSatellite(p: p5, x: number, y: number, z: number, size: number, color: string): void {
		console.log(x, y)
		p.stroke(color);
		p.push();
		p.rotateY(45);
		p.rotateX(-45);
		p.rotateZ(45);
		p.translate(x, y, z);
		p.sphere(size);
		p.pop();
	}

	drawSatelliteInOrbite(p: p5, angle: number, semiMinorAxis: number, semiMajorAxis: number, satelliteSize: number, color: string) {
		let cos = p.cos(angle)
		let x = semiMinorAxis * cos
		let y = this.c * this.getEllipseY(semiMinorAxis, semiMajorAxis, x);
		this.x = x
		this.y = y
		this.drawSatellite(p, this.x, this.y, 0, satelliteSize, color);
	}

	drawText(p: p5, text: [string, string, string, string], x: number, y: number): void {
		p.push()
		p.camera(0, 0, p.sqrt(p.height * p.height + p.width * p.width) / 2, 0, 0, 0, 0, 1, 0);
		p.rotateY(0);
		p.rotateX(0);
		p.rotateZ(0);
		p.translate(0, 0, 0)
		p.stroke(0);
		p.strokeWeight(1);
		p.fill(this.COLORS.WHITE);
		p.textFont(this.font("Pixelify"), 64);
		p.translate(0, 0, 0);
		p.textAlign(p.CENTER, p.CENTER);
		p.text(text[0], 0, -p.height / 2);
		p.text(text[1], 0, p.height / 2 - 2 * 64);
		p.text(text[2], 0, p.height / 2 - 64);
		p.text(text[3], 0, p.height / 2);
		p.pop()
	}

	hydra(h: Hydra, p: p5, active: boolean): void {
		h
			.src(h.s0)//.osc(2, 100, 0.5)
			//.modulate(h.noise(0.3), 0.5)
			.add(h.src(h.o0).scale(() =>
				p.sin(h.time) + 2 * p.cos(h.time) + 5 * p.sin(h.time) + 10 * p.cos(h.time)), .5)
			.diff(h.src(h.o0).scale(10))
			.diff(h.osc(1000, 20, 1.5).scale(10))
			//.modulateScale(h.noise(1000), .01)
			//.modulate(h.noise(3), 0.5)
			.out()

		h.render(h.o0);
	}

	keyPressed(p: p5, h: Hydra): void {
	}

	onBackCanva: () => void = () => {
	};

	getEllipseY(a: number, b: number, x: number): number {
		return b * Math.sqrt(1 - (x * x) / (a * a));
	}
}

export default Jan6SV;