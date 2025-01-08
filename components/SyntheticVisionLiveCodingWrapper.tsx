import React, {RefObject, useCallback, useEffect, useRef, useState} from "react";
import p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import SyntheticVisionAbstract from "../src/SyntheticVisionAbstract";

export interface SyntheticVisionLiveCodingProps {
	syntheticVision: SyntheticVisionAbstract;
	liveCoding: (p: p5, h: Hydra, sv: SyntheticVisionAbstract) => void;
}

const SyntheticVisionLiveCodingWrapper: React.FC<SyntheticVisionLiveCodingProps> = ({syntheticVision, liveCoding}) => {
	const p5Div: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
	const hydraCanvas: RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null);
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [p5Instance, setP5Instance] = useState<p5 | null>(null);
	const [hydraInstance, setHydraInstance] = useState<Hydra | null>(null);

	// on mount
	useEffect(() => {
		setIsMounted(true);
	}, []);

	const initializeHydraAndP5 = useCallback(async () => {
		const gl: RenderingContext | null = hydraCanvas.current!.getContext("webgl") || hydraCanvas.current!.getContext("experimental-webgl");

		if (!gl) {
			console.error("WebGL not supported, falling back to a static image or alternative content.");
			return;
		}

		const h: any = new Hydra({
			canvas: p5Div.current!.getElementsByTagName("canvas")[0],
			width: window.innerWidth,
			height: window.innerHeight,
			makeGlobal: false,
			detectAudio: true,
		}).synth;

		const p5Module = await import("p5");
		// @ts-ignore
		window.p5 = p5Module.default;
		const p5Sound = await import("p5/lib/addons/p5.sound");

		const p = new p5Module.default((p5Instance: p5) => {
			p5Instance.preload = () => {
				syntheticVision.preload(p5Instance);
			}

			p5Instance.setup = () => {
				syntheticVision.initialize(p5Instance, h);
				//alert('Press Play to start the animation');
			}

			h.update = () => {
				p5Instance.redraw();
				syntheticVision.hydra(h, p5Instance, true);
			};

			p5Instance.draw = () => {
				syntheticVision.draw(p5Instance);
			};

			p5Instance.keyPressed = () => {
				syntheticVision.keyPressed(p5Instance, h);
			}

		}, p5Div.current!);

		setP5Instance(p);
		setHydraInstance(h);
	}, [syntheticVision]);

	useEffect(() => {
		if (isMounted && !p5Instance && !hydraInstance) {
			initializeHydraAndP5().then(r => r);
		}
	}, [isMounted, initializeHydraAndP5, p5Instance, hydraInstance]);

	useEffect(() => {
		if (p5Instance && hydraInstance) {
			try {
				hydraInstance.update = () => {
			        p5Instance.redraw();
			    }
				liveCoding(p5Instance, hydraInstance, syntheticVision);
			} catch (e) {
				console.error(e);
			}
		}
	}, [p5Instance, hydraInstance, liveCoding, syntheticVision]);

	return (
		<div>
			<div ref={p5Div}></div>
			<canvas ref={hydraCanvas}></canvas>
		</div>
	);
};
export default SyntheticVisionLiveCodingWrapper;