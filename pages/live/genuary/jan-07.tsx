import dynamic from "next/dynamic";
// @ts-ignore
import styles from "../../../styles/Home.module.css";
import Jan7SV from "../../../visions/genuary/Jan7SV";
import {ComponentType, useCallback, useState} from "react";
import {SyntheticVisionLiveCodingProps} from "../../../components/SyntheticVisionLiveCodingWrapper";
import p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import SyntheticVisionAbstract from "../../../src/SyntheticVisionAbstract";
import CodeMirrorEditor from "../../../components/CodeMirrorEditor";

const SyntheticVisionLiveCodingWrapper: ComponentType<SyntheticVisionLiveCodingProps> =
	dynamic((): Promise<{ default: ComponentType<SyntheticVisionLiveCodingProps> }> =>
		import("../../../components/SyntheticVisionLiveCodingWrapper"), {
		ssr: false
	})

const sv: Jan7SV = new Jan7SV()
const fileName = 'jan-07.js';


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