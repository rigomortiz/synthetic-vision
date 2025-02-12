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

const vision = (p: p5, h: Hydra): void => {

  p.preload = (): void => {
    digitalRain.preload(p);
  }

  p.setup = (): void => {
    digitalRain.initialize(p, h);
  }

  p.draw = (): void => {
    digitalRain.draw(p);
  }

  h.update = (): void => {
    p.redraw();
    digitalRain.hydra(h, p, true);
  }
}

export default function Home(): JSX.Element {
  return (
    <div>
      <main className={styles.main}>
        <SyntheticVisionWrapper vision={vision}/>
      </main>
    </div>
  );
}
