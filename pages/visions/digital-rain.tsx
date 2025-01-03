import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";
import {ComponentType} from "react";
import {SyntheticVisionProps} from "../../components/SyntheticVisionWrapper";
import DigitalRain from "./../../visions/DigitalRain";
import p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";

const SyntheticVisionWrapper: ComponentType<SyntheticVisionProps> =
  dynamic((): Promise<any> => import('../../components/SyntheticVisionWrapper'), {ssr: false})

const digitalRain: DigitalRain = new DigitalRain(true, "webgl");

const vision = (p: p5, h: Hydra) => {

  p.preload = () => {
    digitalRain.preload(p);
  }

  p.setup = () => {
    digitalRain.initialize(p, h);
  }

  p.draw = () => {
    digitalRain.draw(p);
  }

  h.update = () => {
    p.redraw();
    digitalRain.hydra(h, p, true);
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
