import * as p5 from "p5";
import {ColorUtil} from "../utils/ColorUtil";

class GlitchEffect {
    static text(p: p5, text: string, font:p5.Font, size: number, x: number, y: number, noise: number = 5): void {

        for (let i = 0; i < 5; i++) {
            let glitchOffsetX = p.random(-noise, noise);
            let glitchOffsetY = p.random(-noise, noise);
            p.blendMode(p.ADD);
            p.blendMode(p.BLEND);
            p.strokeWeight(2)
            p.stroke("#FFFFFF");
            p.fill(ColorUtil.random(ColorUtil.glitch));
            p.textAlign(p.CENTER, p.CENTER);
            p.textFont(font);
            p.textSize(size);
            p.text(text, x + glitchOffsetX, y + glitchOffsetY);
            p.filter(p.BLUR, 1);
        }

    }
}

export default GlitchEffect;