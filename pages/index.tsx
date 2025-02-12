import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";
import {ComponentType} from "react";
import {SyntheticVisionProps} from "../components/SyntheticVisionWrapper";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
const SyntheticVisionWrapper: ComponentType<SyntheticVisionProps> =
  dynamic((): Promise<any> => import('../components/SyntheticVisionWrapper'), {ssr: false})

import IntroSV from "./../visions/IntroSV";
import SyntheticVisionManager from "../src/managers/SyntheticVisionManager";
import {drawActiveCanvas, drawTransition} from "../src/handlers/DrawHandlers";
import {setupMenuCanvaHandlers} from "../src/handlers/MenuCanvaHandlers";
import {setupBackMenuHandlers} from "../src/handlers/BackMenuHandlers";
import {handleKeyPress} from "../src/handlers/KeyPressHandlers";
import { SyntheticsVisions } from "../src/enums/SyntheticsVisions";


const SyntheticVisionMain = (p: p5, h: Hydra) => {
  let transitioning: boolean = true;
  let transitionOpacity: number = 255;
  const svManager = SyntheticVisionManager.getInstance();

  svManager.addItem(SyntheticsVisions.Intro, new IntroSV());

  p.preload = () => {
    SyntheticVisionManager.preload(p);
  };

  p.setup = () => {
    svManager.getItem(SyntheticsVisions.Intro)!.initialize(p, h);
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

  p.keyPressed = (): void => handleKeyPress(p, h);

  p.windowResized = (): void => {
    SyntheticVisionManager.resize(p, h);
  };

}
export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <SyntheticVisionWrapper vision={SyntheticVisionMain}/>
      </main>
    </div>
  );
}
