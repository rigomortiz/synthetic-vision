import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";
import {ComponentType, useCallback, useState} from "react";
import {SyntheticVisionLiveCodingProps} from "../../components/SyntheticVisionLiveCodingWrapper";
import CodeMirrorEditor from "../../components/CodeMirrorEditor";
import p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";
import LiveSV from "../../visions/LiveSV";


const SyntheticVisionLiveCodingWrapper: ComponentType<SyntheticVisionLiveCodingProps> =
	dynamic((): Promise<{default: ComponentType<SyntheticVisionLiveCodingProps>}> => import("../../components/SyntheticVisionLiveCodingWrapper"), {
		ssr: false
	})

const syntheticVision: LiveSV = new LiveSV()
const fileName = 'intro.js';

export default function Home(): JSX.Element {
	const [code, setCode] = useState("");
	const [vision, setVision] = useState<((p: p5, h: Hydra, sv: SyntheticVisionAbstract) => void)>((): void => {});

	const handleCodeChange: (code: string) => void = useCallback((code: string): void => {
		setCode(code);
	}, []);

	return (
		<div>
			<main className={styles.main}>
				<CodeMirrorEditor fileName={fileName} onCodeChange={handleCodeChange} setVision={setVision}/>
				<SyntheticVisionLiveCodingWrapper syntheticVision={syntheticVision} liveCoding={vision}/>
			</main>
		</div>
	);
}