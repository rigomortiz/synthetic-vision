import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";
import {ComponentType} from "react";
import {SyntheticVisionProps} from "../../components/SyntheticVisionWrapper";
import p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import AtomicBombSV from "../../visions/AtomicBombSV";

const SyntheticVisionWrapper: ComponentType<SyntheticVisionProps> =
  dynamic((): Promise<any> => import('../../components/SyntheticVisionWrapper'), {ssr: false})

const atommicBomb: AtomicBombSV = new AtomicBombSV(true, "webgl");

const vision = (p: p5, h: Hydra) => {

  p.preload = () => {
    atommicBomb.preload(p);
  }

  p.setup = () => {
    atommicBomb.initialize(p, h);
  }

  p.draw = () => {
    atommicBomb.draw(p);
  }

  h.update = () => {
    p.redraw();
    atommicBomb.hydra(h, p, true);
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
