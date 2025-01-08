import {ComponentType, useCallback, useState} from "react";
import {SyntheticVisionLiveCodingProps} from "../../../components/SyntheticVisionLiveCodingWrapper";
import dynamic from "next/dynamic";
// @ts-ignore
import Hydra from "hydra-synth";
import p5 from "p5";
import SyntheticVisionAbstract from "../../../src/SyntheticVisionAbstract";
import styles from "../../../styles/Home.module.css";
import CodeMirrorEditor from "../../../components/CodeMirrorEditor";
<<<<<<< HEAD
import Jan6SV from "../../../visions/genuary/Jan6SV";
=======
import Jan5SV from "../../../visions/genuary/Jan5SV";
>>>>>>> eb9f59056264723192bcb5c45fa0ee9f2cf1ef6e

const SyntheticVisionLiveCodingWrapper: ComponentType<SyntheticVisionLiveCodingProps> =
	dynamic((): Promise<{ default: ComponentType<SyntheticVisionLiveCodingProps> }> =>
		import("../../../components/SyntheticVisionLiveCodingWrapper"), {
		ssr: false
	})

<<<<<<< HEAD
const sv: Jan6SV = new Jan6SV()
const fileName = 'jan-06.js';
=======
const sv: Jan5SV = new Jan5SV()
const fileName = 'jan-05.js';
>>>>>>> eb9f59056264723192bcb5c45fa0ee9f2cf1ef6e

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