import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";

class Jan3SV extends SyntheticVisionAbstract {
    mouseMove(p: import("p5")): void {
        throw new Error("Method not implemented.");
    }
    digits: string = "0123456789";
    numbers: string[][] = [];
    numLines: number = 42;
    lineHeight: number = 0;
    frameCounter: number = 0;
    maxFrames: number = 100;
    title: string = "Exactly 42 lines of code."

    preload(p: p5): void {
    }

    setup(p: p5, h: Hydra): void {
        p.describe(this.title);
        p.colorMode(p.RGB, 42, 42, 42);
        p.pixelDensity(4.2);

        this.lineHeight = p.height / this.numLines;

        for (let i = 0; i < this.numLines; i++) {
            this.numbers[i] = [];
            for (let j = 0; j < p.width / this.lineHeight; j++) {
                this.numbers[i][j] = this.digits.charAt(p.floor(p.random(10)));
            }
        }
    }

    draw(p: p5, h: Hydra): void {
        p.clear();
        p.fill(0, 42, 0, 42);
        p.stroke(255, 0, 255, 42);
        p.strokeWeight(.42);
        p.textFont('monospace', this.lineHeight);
        p.textAlign(p.LEFT, p.TOP);
        p.background(0,0,0,42);

        if (this.frameCounter < this.maxFrames) {
            for (let i = 0; i < this.numLines; i++) {
                for (let j = 0; j < p.width / this.lineHeight; j++) {
                    if (p.random(1) < 0.42) {
                        this.numbers[i][j] = this.digits.charAt(p.floor(p.random(10)));
                    }
                    p.text(this.numbers[i][j], j * this.lineHeight, i * this.lineHeight);
                }
            }
            this.frameCounter++;
        } else {
            p.background(0,42,0,42);
            p.textAlign(p.CENTER, p.CENTER);
            p.text(this.title, p.width / 2, p.height / 2);
            setTimeout(() => {
                this.frameCounter = 0;
            }, 42*100);
        }
    }

    hydra(h: Hydra, p: p5, active: boolean): void {
        h.src(h.s0)
            .color(0,.42,0)
            .scale(4.2)
            //.modulate(h.noise(-.42), -.42)
            .blend(h.src(h.o0).brightness(-.42), -.42)
            .layer(h.s0)
            .modulateScale(h.noise(.42), .42)
            .add(h.src(h.o0).scale(()=> p.tan( h.time*.42)), .42)
            //.modulateScale(h.noise(4.2).modulate(h.noise(-.42), -0.42), 4.2)
            .out(h.o0)
    }

    keyPressed(p: p5, h: Hydra): void {
    }

    onBackCanva: () => void = () => {
    };

}

export default Jan3SV;