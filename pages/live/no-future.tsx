import styles from "../../styles/Home.module.css";
import dynamic from "next/dynamic";
import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import React, {ComponentType, useCallback, useState} from "react";
import CodeMirrorEditor from "../../components/CodeMirrorEditor";
import SyntheticVisionAbstract from "../../src/SyntheticVisionAbstract";
import {SyntheticVisionLiveCodingProps} from "../../components/SyntheticVisionLiveCodingWrapper";
import NoFutureVS from "../../visions/NoFutureVS";

const SyntheticVisionLiveCodingWrapper: ComponentType<SyntheticVisionLiveCodingProps> =
	dynamic((): Promise<{default: ComponentType<SyntheticVisionLiveCodingProps>}> => import("../../components/SyntheticVisionLiveCodingWrapper"), {
		ssr: false
	})

const noFutureVS: NoFutureVS = new NoFutureVS();
const fileName = 'no-future.js';

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
				<SyntheticVisionLiveCodingWrapper syntheticVision={noFutureVS} liveCoding={vision}/>
			</main>
		</div>
	);
}