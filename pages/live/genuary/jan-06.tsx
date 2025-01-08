import {ComponentType, useCallback, useState} from "react";
import {SyntheticVisionLiveCodingProps} from "../../../components/SyntheticVisionLiveCodingWrapper";
import dynamic from "next/dynamic";
// @ts-ignore
import Hydra from "hydra-synth";
import p5 from "p5";
import SyntheticVisionAbstract from "../../../src/SyntheticVisionAbstract";
import styles from "../../../styles/Home.module.css";
import CodeMirrorEditor from "../../../components/CodeMirrorEditor";
import Jan6SV from "../../../visions/genuary/Jan6SV";

const SyntheticVisionLiveCodingWrapper: ComponentType<SyntheticVisionLiveCodingProps> =
	dynamic((): Promise<{ default: ComponentType<SyntheticVisionLiveCodingProps> }> =>
		import("../../../components/SyntheticVisionLiveCodingWrapper"), {
		ssr: false
	})

const sv: Jan6SV = new Jan6SV()
const fileName = 'jan-06.js';

export default function Home() {
	const [code, setCode] = useState("");
	const [vision, setVision] = useState<((p: p5, h: Hydra, sv: SyntheticVisionAbstract) => void)>(() => {
	});

	const handleCodeChange = useCallback((code: string) => {
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
