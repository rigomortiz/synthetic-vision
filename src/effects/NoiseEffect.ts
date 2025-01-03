import * as Tone from "tone";
import {NoSignalColors} from "../enums/Colors";
import p5 from "p5";
import {ColorUtil} from "../utils/ColorUtil";

class NoiseEffect{
    static soundTone(): void {
        /*const noise = new Tone.Noise("white").start();
        const filter = new Tone.Filter(800, "highpass").toDestination();
        const envelope = new Tone.AmplitudeEnvelope({
            attack: 0.01,
            decay: 0.1,
            sustain: 0,
            release: 0.1
        }).toDestination();

        noise.connect(filter);
        filter.connect(envelope);
        envelope.triggerAttackRelease(0.1);

        setTimeout(() => {
            noise.dispose();
            filter.dispose();
            envelope.dispose();
        }, 500);
        */
    }

    static rectNoise(p: p5, x: number, y: number, staticSize:number): void {
        for (let i = 0; i < staticSize; i++) {
            for (let j = 0; j < staticSize; j++) {
                p.blendMode(p.ADD);
                p.fill(ColorUtil.random(ColorUtil.glitch));
                p.stroke(ColorUtil.random(ColorUtil.glitch));
                p.point(x + i - staticSize / 2, y + j - staticSize / 2);
                p.blendMode(p.BLEND);
            }
        }
    }

    static points(p: any, x: number, y: number, n: number): void {
        for (let i = 0; i < n; i++) {
            p.stroke(255);
            p.square(p.random(x), p.random(y), 2);
        }
    }

    static TVStatic(p: any): void {
        const rectWidth = p.width / 7;

        let colors = ColorUtil.getColors("NoSignal")
        for (let i = 0; i < 7; i++) {
            p.fill(colors[i]);
            p.stroke(colors[i]);
            p.rect(i * rectWidth, 0, rectWidth, 4/5 * p.height);
        }

        colors = [NoSignalColors.Blue, NoSignalColors.Black, NoSignalColors.Magenta, NoSignalColors.Black,
            NoSignalColors.Cyan, NoSignalColors.Black, NoSignalColors.White];

        for (let i = 0; i < 7; i++) {
            p.fill(colors[i]);
            p.stroke(colors[i]);
            p.rect(i * rectWidth, 4/5 * p.height, rectWidth, p.height);
        }
    }
}

export default NoiseEffect;