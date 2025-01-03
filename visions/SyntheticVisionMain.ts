import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";

import IntroSV from "./IntroSV";
import MenuSV from "./MenuSV";
import DigitalRain from "./DigitalRain";
import NullPointerExceptionSV from "./NullPointerExceptionSV";
import GlitchWorldSV from "./GlitchWorldSV";
import EncryptedNodeSV from "./EncryptedNodeSV";
import SyntheticVisionManager from "../src/managers/SyntheticVisionManager";
import {drawActiveCanvas, drawTransition} from "../src/handlers/DrawHandlers";
import {setupMenuCanvaHandlers} from "../src/handlers/MenuCanvaHandlers";
import {setupBackMenuHandlers} from "../src/handlers/BackMenuHandlers";
import {handleKeyPress} from "../src/handlers/KeyPressHandlers";

export enum SyntheticsVisions {
  Intro = "Intro",
  Menu = "Menu",
  TheBitBallet = "TheBitBallet",
  NullPointerException = "NullPointerException",
  GlitchWorld = "GlitchWorld",
  EncryptedNode = "EncryptedNode"
}

const SyntheticVisionMain = (p: p5, h: Hydra) => {
  let transitioning: boolean = true;
  let transitionOpacity: number = 255;
  SyntheticVisionManager.getInstance().addItem(SyntheticsVisions.Intro, new IntroSV(true, "webgl"));
  SyntheticVisionManager.getInstance().addItem(SyntheticsVisions.Menu, new MenuSV(false, "webgl"));
  SyntheticVisionManager.getInstance().addItem(SyntheticsVisions.TheBitBallet, new DigitalRain(false, "webgl"));
  SyntheticVisionManager.getInstance().addItem(SyntheticsVisions.NullPointerException, new NullPointerExceptionSV(false, "webgl"));
  SyntheticVisionManager.getInstance().addItem(SyntheticsVisions.GlitchWorld, new GlitchWorldSV(false, "webgl"));
  SyntheticVisionManager.getInstance().addItem(SyntheticsVisions.EncryptedNode, new EncryptedNodeSV(false, "webgl"));

  p.preload = () => {
    SyntheticVisionManager.preload(p);
  };

  p.setup = () => {
    SyntheticVisionManager.getInstance().getItem(SyntheticsVisions.Intro)!.initialize(p, h);
  };

  h.update = ()=> {
    p.redraw();
    SyntheticVisionManager.hydra(h, p);
  }

  p.draw = () => {
    if (transitioning) {
      transitionOpacity = drawTransition(p, transitionOpacity);
      if (transitionOpacity <= 0) {
        transitioning = false;
        transitionOpacity = 255;
      }
    } else {
      drawActiveCanvas(p);
    }
  };

  setupMenuCanvaHandlers(p, h);
  setupBackMenuHandlers(p, h);

  p.keyPressed = () => handleKeyPress(p, h);
};

export default SyntheticVisionMain;
