import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";
import {ComponentType, useCallback, useState} from "react";
import {SyntheticVisionLiveCodingProps} from "../../components/SyntheticVisionLiveCodingWrapper";
import CodeMirrorEditor from "../../components/CodeMirrorEditor";
import p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import IntroSV from "../../visions/IntroSV";
import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";


const SyntheticVisionLiveCodingWrapper: ComponentType<SyntheticVisionLiveCodingProps> =
	dynamic((): Promise<{default: ComponentType<SyntheticVisionLiveCodingProps>}> => import("../../components/SyntheticVisionLiveCodingWrapper"), {
		ssr: false
	})

const introSV: IntroSV = new IntroSV(true, "webgl")
const fileName = 'intro.js';

export default function Home() {
	const [code, setCode] = useState("");
	const [vision, setVision] = useState<((p: p5, h: Hydra, sv: SyntheticVisionAbstract) => void)>(() => {});

	const handleCodeChange = useCallback((code: string) => {
		setCode(code);
	}, []);

	return (
		<div>
			<main className={styles.main}>
				<CodeMirrorEditor fileName={fileName} onCodeChange={handleCodeChange} setVision={setVision}/>
				<SyntheticVisionLiveCodingWrapper syntheticVision={introSV} liveCoding={vision}/>
			</main>
		</div>
	);
}