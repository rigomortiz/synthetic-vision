import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";
import {ComponentType} from "react";
import {SyntheticVisionProps} from "../../components/SyntheticVisionWrapper";
import DigitalRain from "./../../visions/DigitalRain";
import p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import GlitchWorldSV from "../../visions/GlitchWorldSV";

const SyntheticVisionWrapper: ComponentType<SyntheticVisionProps> =
  dynamic((): Promise<any> => import('../../components/SyntheticVisionWrapper'), {ssr: false})

const glitchWorld: GlitchWorldSV = new GlitchWorldSV(true, "webgl");

const vision = (p: p5, h: Hydra) => {

  p.preload = () => {
    glitchWorld.preload(p);
  }

  p.setup = () => {
    glitchWorld.initialize(p, h);
  }

  p.draw = () => {
    glitchWorld.draw(p);
  }

  h.update = () => {
    p.redraw();
    glitchWorld.hydra(h, p, true);
  }
}

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <SyntheticVisionWrapper vision={vision}/>
      </main>
    </div>
  );
}
