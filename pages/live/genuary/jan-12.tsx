import {ComponentType, useCallback, useState} from "react";
import {SyntheticVisionLiveCodingProps} from "../../../components/SyntheticVisionLiveCodingWrapper";
import dynamic from "next/dynamic";
// @ts-ignore
import Hydra from "hydra-synth";
import p5 from "p5";
import SyntheticVisionAbstract from "../../../src/SyntheticVisionAbstract";
import styles from "../../../styles/Home.module.css";
import CodeMirrorEditor from "../../../components/CodeMirrorEditor";
import Jan12SV from "../../../visions/genuary/Jan12SV";

const SyntheticVisionLiveCodingWrapper: ComponentType<SyntheticVisionLiveCodingProps> =
	dynamic((): Promise<{ default: ComponentType<SyntheticVisionLiveCodingProps> }> =>
		import("../../../components/SyntheticVisionLiveCodingWrapper"), {
		ssr: false
	})

const sv: Jan12SV = new Jan12SV()
const fileName = 'jan-12.js';

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
				<SyntheticVisionLiveCodingWrapper syntheticVision={sv} liveCoding={vision}/>
			</main>
		</div>
	);
}