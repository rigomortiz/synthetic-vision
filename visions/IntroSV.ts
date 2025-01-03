import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import {SyntheticsVisions} from "./SyntheticVisionMain";
import SyntheticVisionManager from "../src/managers/SyntheticVisionManager";
import {Fonts} from "../src/enums/Fonts";
import {NoSignalColors} from "../src/enums/Colors";
import SyntheticVisionAbstract from "../src/SyntheticVisionAbstract";

class IntroSV extends SyntheticVisionAbstract {
  title: string = "Synthetic Vision";

  preload(p: p5) {
  }

  setup(p: p5, h: Hydra): void {
    p.describe(this.title);
  }

  draw(p: p5): void {
    p.clear();
    this.drawText(p);
    this.drawBionicEye(p);
  }

  drawBionicEye(p: p5): void {
    let radius = p.map(this.amplitude!.getLevel(), 0, 1, 10, 200);
    let red = p.map(this.amplitude!.getLevel(), 0, 1, 0, 255);
    p.pointLight(255, 0, 0, 0, 0, p.sqrt(p.width**2 + p.height**2));
    p.noStroke();
    p.ambientLight(red, 0, 0);
    p.specularMaterial(255, 0, 0);
    p.translate(0, -100, 0);
    p.sphere(radius);
  }

  keyPressed(p: p5, h: Hydra): void {
    if (p.keyCode === p.ENTER) {
      SyntheticVisionManager.getInstance().getItem(SyntheticsVisions.Intro)!.remove();

      setTimeout(() => {
        SyntheticVisionManager.getInstance().getItem(SyntheticsVisions.Menu)!.initialize(p, h);
      }, 500);

    }
  }

  drawText(p: p5): void {
    p.textAlign(p.CENTER, p.CENTER);
    p.textFont(this.font(Fonts.Volunmo));
    p.fill(NoSignalColors.White);
    p.textSize(200);
    p.text(this.title, 0, 0);
    p.textSize(48);
    p.textFont(this.font(Fonts.Terminus));
    p.fill(NoSignalColors.White);
    p.text("PRESS ENTER", 0, 200);


    if (p.frameCount % 60 < 30) {
      p.textSize(48);
      p.textFont(this.font(Fonts.Terminus));
      p.fill(NoSignalColors.Yellow);
      p.text("PRESS ENTER", 0, 200);
    }
  }

  hydra(h: Hydra, p: p5, active: boolean = false): void {
    if (!active) return;
    h.osc(10, 0.1, Math.PI / 2)
      .color(1,0,3)
      .layer(h.src(h.s0))
      .blend(h.noise(3))
      .rotate(0.5)
      //.modulate(h.osc(() => this.fft!.analyze()[0]))
      .scrollX(0.1, 0.1)
      .scrollY(0.1, -0.1)
      .modulate(h.osc(0.2, 0.05).rotate(Math.PI / 2))
      .out(h.o0)

    h.render(h.o0);
  }

  onBackCanva: () => void = () => {
  };
}

export default IntroSV;