import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import SyntheticVisionManager from "../managers/SyntheticVisionManager";

export function handleKeyPress(p: p5, h: Hydra) {
	for (let [key, syntheticVision] of SyntheticVisionManager.getInstance().getAllItems())
		if (syntheticVision.active)
			syntheticVision.keyPressed(p, h);
}