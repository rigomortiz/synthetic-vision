import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import SyntheticVisionAbstract from "../src/SyntheticVisionAbstract";
import Nodes from "../src/animations/Nodes";
import {MatrixColors} from "../src/enums/Colors";
import FontManager from "../src/managers/FontManager";
import {FontPaths, Fonts} from "../src/enums/Fonts";

class EncryptedNodeSV extends SyntheticVisionAbstract {
    title: string = "encrypted-node.py";
    particles: Nodes[] = [];
    nodes: number = 20;


    onBackCanva: () => void = () => {
    };

    preload(p: p5): void {
        FontManager.preloadFonts(p, FontPaths);
        for (let i: number = 0; i < this.nodes; i++) {
            this.particles.push(new Nodes(p, window.innerWidth, window.innerHeight));
        }
    }

    setup(p: p5, h: Hydra): void {
        p.describe('A Encrypted Node');
        this.handleContextLost(p);
    }

    draw(p: p5): void {
        //p.clear();
        p.lights()
        p.orbitControl();
        //p.rotate(p.frameCount * 0.01, [1, 1, 1]);
        let level = this.amplitude!.getLevel();
        let waveform = this.fft!.waveform();
        let diameter = p.map(level, 0, 1, 10, 1000);

        p.background(Math.abs(waveform[0] * 255), Math.abs(waveform[1] * 255), Math.abs(waveform[2] * 255), 100);
        this.wave(p, waveform)
		this.sphere(p, diameter)
		this.drawParticles(p, level)

    }

    drawText(p: p5): void {
        p.fill(MatrixColors.White);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(64);
        p.textFont(FontManager.getFont(Fonts.Terminus));
        p.text(this.title, 0, 0)
    }

	wave(p: p5, waveform: any){
		p.noFill();
        p.beginShape();
        p.stroke(255);
        for (let i = 0; i < waveform.length; i++) {
            let x = p.map(i, 0, waveform.length, -p.width, p.width);
            let y = p.map(waveform[i], -1, 1, -p.height, p.height);
            p.vertex(x, y, 0);
        }
        p.endShape();
	}

	sphere(p: p5, diameter: number) {
		p.translate(0, 0, -200);
        p.fill(255);
        p.noStroke();
        p.sphere(diameter);
        p.translate(0, 0, 200);
	}

	drawParticles(p: p5, level: number) {
		for (let i = 0; i < this.particles.length; i++) {
            let r = p.map(level, 0, 1, 5, 50);
            let color = this.particles[i].color;
            this.particles[i].moveParticle();
            this.particles[i].joinParticles(p, this.particles.slice(i));
            this.particles[i].createParticle(p, r, color);
        }
	}

    keyPressed(p: p5): void {
        if (p.keyCode === p.BACKSPACE) {
            this.remove();
            this.onBackCanva();
        }
    }

    hydra(h: Hydra, p: p5, active: boolean = false): void {
        if (!active) {
            return;
        }

        h.src(h.s0)
			.add(h.src(h.o0).scale(1), .9)
            .color(0, 1, 0)
			.modulateScale(h.noise(this.fft!.analyze()[0]), .01)
            .out(h.o0);

    }

    handleContextLost(p: p5): void {
        const canvas = this.canvas.elt;
        canvas.addEventListener('webglcontextlost', (event: { preventDefault: () => void; }) => {
            event.preventDefault();
            console.warn('WebGL context lost. Attempting to restore...');
			alert("Load");
            // Attempt to restore the context
            setTimeout(() => {
                p.setup();
            }, 1000);
        }, false);
    }

}

export default EncryptedNodeSV;