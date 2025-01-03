import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import SyntheticVisionManager from "../managers/SyntheticVisionManager";
import SyntheticVisionAbstract, {SyntheticsVisions} from "../SyntheticVisionAbstract";

function setBackMenuHandler(syntheticVision: SyntheticVisionAbstract, p: p5, h: Hydra) {
	syntheticVision.onBackCanva = () => {
		SyntheticVisionManager.getInstance().getItem(SyntheticsVisions.Menu)!.initialize(p, h);
	};
}

export function setupBackMenuHandlers(p: p5, h: Hydra) {
	for (let [key, syntheticVision] of SyntheticVisionManager.getInstance().getAllItems()) {
		if (key === SyntheticsVisions.Menu || key === SyntheticsVisions.Intro)
			continue;
		setBackMenuHandler(syntheticVision, p, h);
	}
}