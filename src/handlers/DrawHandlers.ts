import * as p5 from "p5";
import FontManager from "../managers/FontManager";
import { Fonts } from "../enums/Fonts";
import SyntheticVisionManager from "../managers/SyntheticVisionManager";
// @ts-ignore
import Hydra from "hydra-synth";

export function drawTransition(p: p5, transitionOpacity: number) {
  p.clear()
  p.background(0);
  p.fill(255);
  p.strokeWeight(1);
  p.textSize(32);

  p.textAlign(p.CENTER, p.CENTER)
  p.textFont(FontManager.getFont(Fonts.Terminus));
  p.text("Loading ...", p.width / 2, p.height / 2);
  p.background(0, transitionOpacity);

  return transitionOpacity - 3;
}

export function drawActiveCanvas(p: p5, h: Hydra) {
  for (let [key, syntheticVision] of SyntheticVisionManager.getInstance().getAllItems())
    if (syntheticVision.active)
      syntheticVision.draw(p, h);
}