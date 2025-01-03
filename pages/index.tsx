import styles from "../styles/Home.module.css";
import vision from "./../visions/SyntheticVisionMain"
import dynamic from "next/dynamic";
import {ComponentType} from "react";
import {SyntheticVisionProps} from "../components/SyntheticVisionWrapper";

const SyntheticVisionWrapper: ComponentType<SyntheticVisionProps> =
  dynamic((): Promise<any> => import('../components/SyntheticVisionWrapper'), {ssr: false})

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <SyntheticVisionWrapper vision={vision}/>
      </main>
    </div>
  );
}
