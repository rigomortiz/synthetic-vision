import React, {RefObject, useEffect, useRef, useState} from "react";
import p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import AudioComponent from "./AudioComponent";


export interface SyntheticVisionProps {
	vision: (p: p5, h: Hydra) => void;
}

const SyntheticVisionWrapper: React.FC<SyntheticVisionProps> = ({vision}: SyntheticVisionProps) => {
	const p5Div: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
	const hydraCanvas: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);
	const [isMounted, setIsMounted] = useState<boolean>(false)

	// on mount
	useEffect(() => {
		setIsMounted(true);
	}, [])

	useEffect(() => {
		if (!isMounted) return;

		const gl = hydraCanvas.current!.getContext("webgl") || hydraCanvas.current!.getContext("experimental-webgl");

		if (!gl) {
			console.error("WebGL not supported, falling back to a static image or alternative content.");
			// Provide fallback content or alternative rendering here.
			return;
		}

		let p5Instance: p5;
		let p5Canvas: HTMLCanvasElement = p5Div.current!.getElementsByTagName("canvas")[0];

		const hydraInstance = new Hydra({
			canvas: p5Canvas,
			width: window.innerWidth,
			height: window.innerHeight - 10,
			makeGlobal: false,
			detectAudio: false,
			precision: "highp",
			autoLoop: true,
			numSources: 5,
			numOutputs: 5,
		}).synth;

		const initP5 = async () => {
			// import the p5 and p5-sounds client-side
			const p5 = (await import("p5")).default;
			// @ts-ignore
			window.p5 = p5;
			// @ts-ignore
			window.p5Sound = await import("p5/lib/addons/p5.sound");

			return p5;
		};

		initP5().then((p5) => {
			p5Instance = new p5((p5Instance: p5) => vision(p5Instance, hydraInstance), p5Div.current!);
		});

		return () => {
			p5Instance.remove();
		}
	}, [isMounted, vision]);

	return (
		<div>
			<div ref={p5Div}></div>
			<canvas ref={hydraCanvas}></canvas>
		</div>
	);
};

export default SyntheticVisionWrapper;