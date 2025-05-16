import styles from "../../styles/Gallery.module.css";
import dynamic from "next/dynamic";
import {ComponentType} from "react";
import React from "react";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";

import CiudadSinRecuerdosSV from "./../../visions/CiudadSinRecuerdosSV";
import SyntheticVisionManager from "../../src/managers/SyntheticVisionManager";
import {drawActiveCanvas, drawTransition} from "../../src/handlers/DrawHandlers";
import {setupMenuCanvaHandlers} from "../../src/handlers/MenuCanvaHandlers";
import {setupBackMenuHandlers} from "../../src/handlers/BackMenuHandlers";
import {handleKeyPress} from "../../src/handlers/KeyPressHandlers";
import { SyntheticsVisions } from "../../src/enums/SyntheticsVisions";
import {SyntheticVisionProps} from "../../components/SyntheticVisionWrapper";

const SyntheticVisionWrapper: ComponentType<SyntheticVisionProps> =
  dynamic((): Promise<any> => import('../../components/SyntheticVisionWrapper'), {ssr: false})


const sv = (p: p5, h: Hydra): void => {
  let transitioning: boolean = true;
  let transitionOpacity: number = 255;
  const svManager: SyntheticVisionManager = SyntheticVisionManager.getInstance();

  svManager.addItem(SyntheticsVisions.CiudadSinRecuerdos, new CiudadSinRecuerdosSV());

  p.preload = (): void => {
    SyntheticVisionManager.preload(p);
  };

  p.setup = (): void => {
    svManager.getItem(SyntheticsVisions.CiudadSinRecuerdos)!.initialize(p, h);
  };

  h.update = (): void=> {
    p.redraw();
    SyntheticVisionManager.hydra(h, p);
  }

  p.draw = (): void => {
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

  //setupMenuCanvaHandlers(p, h);
  //setupBackMenuHandlers(p, h);

  p.keyPressed = (): void => handleKeyPress(p, h);

  p.windowResized = (): void => {
    SyntheticVisionManager.resize(p, h);
  };

}
export default function Page(): JSX.Element  {
  return (
    <div>
      <main className={styles.main}>
        <SyntheticVisionWrapper vision={sv}/>
      </main>
    </div>
  );
}
