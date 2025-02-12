import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";
import {ComponentType} from "react";
import {SyntheticVisionProps} from "../../components/SyntheticVisionWrapper";
import p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import EncryptedNodeSV from "../../visions/EncryptedNodeSV";

const SyntheticVisionWrapper: ComponentType<SyntheticVisionProps> =
    dynamic((): Promise<any> => import('../../components/SyntheticVisionWrapper'), {ssr: false})

const encryptedNode: EncryptedNodeSV = new EncryptedNodeSV(true, "webgl");

const vision = (p: p5, h: Hydra): void => {

    p.preload = (): void => {
        encryptedNode.preload(p);
    }

    p.setup = (): void => {
        encryptedNode.initialize(p, h);
    }

    p.draw = (): void => {
        encryptedNode.draw(p);
    }

    h.update = (): void => {
        p.redraw();
        encryptedNode.hydra(h, p, true);
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
