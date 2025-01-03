import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import SyntheticVisionAbstract from "../src/SyntheticVisionAbstract";
import AcidRain from "../src/animations/AcidRain";
import FontManager from "../src/managers/FontManager";
import {FontPaths, Fonts} from "../src/enums/Fonts";
import {MatrixColors} from "../src/enums/Colors";
import BitRain3D from "../src/effects/BitRain3D";
import {ColorUtil} from "../src/utils/ColorUtil";
import Waveform from "../src/animations/Waveform";
import Sprectrum from "../src/animations/Spectrum";

class DigitalRain extends SyntheticVisionAbstract {
  title: string = "Digital Rain";
  acidRain: AcidRain = new AcidRain()
  bits: BitRain3D[] = [];
  words: string[] = [
    "1", "0"
  ]

  preload(p: p5) {
    FontManager.preloadFonts(p, FontPaths);
  }

  setup(p: p5, h: Hydra): void {
    this.acidRain.setup(p, p.width, p.height);
    p.colorMode(p.HSL);
    for (let i = 0; i < 200; i++) {
      this.bits.push(new BitRain3D(p));
    }
  }

  draw(p: p5): void {
    p.clear()
    //p.background(0, 0, 0, 150);
    let level = this.mic!.getLevel();
    let waveform: number[] = this.fft!.waveform();
    let spectrum: number[] = this.fft!.analyze();

    p.lights();
    p.orbitControl();
    //p.rotate(p.frameCount * 0.01, [1, 1, 1]);
    this.drawTerminalBackground3D(p, 20, 1);
    
    for (let bit of this.bits) {
      let size = p.map(level, 0, 0.1, 10, 50);
      let speed = p.map(level, 0, 0.1, 1, 10);
      bit.show(p, size, speed, FontManager.getFont(Fonts.Terminus));
    }

    Waveform.draw3d(p, waveform, MatrixColors.White, 1);
    Sprectrum.draw3d(p, spectrum, MatrixColors.White, 1);

    this.text(p);

  }

  hydra(h: Hydra, p: p5, active: boolean = false): void {
    if (!active) return;

    this.hydraEffects(h, p);

  }

  onBackCanva: () => void = () => {
  };

  keyPressed(p: p5): void {
    if (p.keyCode === p.BACKSPACE) {
      this.remove();
      this.onBackCanva();
    }
  }

  showRandomText3D(p: p5, number: number): void {
    for (let i = 0; i < number; i++) {
      p.textAlign(p.CENTER, p.CENTER);
      p.fill(ColorUtil.random(ColorUtil.glitch));
      let x = p.random(-p.width / 2, p.width / 2);
      let y = p.random(-p.height / 2, p.height / 2);
      p.textFont(FontManager.getFont(Fonts.Terminus));
      p.textSize(50);
      p.text(this.words[p.random([0, this.words.length - 1])], x, y);
    }
  }

  showRandomText2D(p: p5, number: number): void {
    for (let i = 0; i < number; i++) {
      p.textAlign(p.CENTER, p.CENTER);
      p.fill(ColorUtil.random(ColorUtil.glitch));
      let x = p.random(0, p.width);
      let y = p.random(0, p.height);
      p.textFont(FontManager.getFont(Fonts.Terminus));
      p.textSize(50);
      p.text(this.words[p.random([0, this.words.length - 1])], x, y);
    }
  }

  drawTerminalBackground3D(p: p5, size: number = 10, blur: number = 2) {
    p.stroke(MatrixColors.Green_1);
    p.strokeWeight(1);
    for (let i = -p.width / 2; i <= p.width / 2; i += size) {
      p.line(i, -p.height / 2, i, p.height / 2);
    }
    for (let j = -p.height / 2; j <= p.height / 2; j += size) {
      p.line(-p.width / 2, j, p.width / 2, j);
    }
    p.filter(p.BLUR, blur);
  }

  drawTerminalBackground2D(p: p5, size: number = 10, blur: number = 2) {
    p.stroke(MatrixColors.Green_1);
    p.strokeWeight(1);
    for (let i = 0; i <= p.width; i += size) {
      p.line(i, 0, i, p.height);
    }
    for (let j = 0; j <= p.height; j += size) {
      p.line(0, j, p.width, j);
    }
    p.filter(p.BLUR, blur);
  }

  text(p: p5) {
    p.textSize(100);
    p.textFont(FontManager.getFont(Fonts.Terminus));
    p.textAlign(p.CENTER, p.CENTER);
    p.fill(MatrixColors.White);
    p.text("Digital Rain", 0, 0);

  }

  hydraEffects(h: Hydra, p: p5): void {
    h.osc(4, 0.1, 0.8)
      .color(1.04, 0, -1.1)
      .rotate(0.30, 0.1)
      .pixelate(this.mic!.getLevel() * 1000 , this.mic!.getLevel() * 1000)
      //.modulate(h.noise(2.5), () => 1.5 * Math.sin(this.mic!.getLevel() * h.time))
      .modulate(h.noise(2.5), () => 1.5 * Math.sin(p.map(this.fft!.waveform()[0], -1, 1, p.PI, 2*p.PI) * h.time))
      .out(h.o0)

    h.render(h.o0);
  }

  rainEffect(h: Hydra, p: p5): void {
    let mouseX = p.map(p.mouseX, 0, p.width, 0, 1);
    let mouseY = p.map(p.mouseY, 0, p.height, 0, 1);

    h.src(h.o0)
      .scale(.9)
      .blend(h.src(h.o0).brightness(-0.9), 0.1)
      .modulate(h.osc(() => this.fft!.analyze()[0]))
      .scrollX(mouseX, mouseX)
      .scrollY(mouseY, mouseY)
      .layer(h.s0)
      .out(h.o0)

    h.render(h.o0);
  }

}

export default DigitalRain;