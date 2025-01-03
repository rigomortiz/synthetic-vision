import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import SyntheticVisionManager from "../managers/SyntheticVisionManager";
import SyntheticVisionAbstract, {SyntheticsVisions} from "../SyntheticVisionAbstract";

function setMenuHandler(menuCanva: SyntheticVisionAbstract, canvas: SyntheticVisionAbstract, handlerName: string, p: p5, h: Hydra) {
	// @ts-ignore
	menuCanva[handlerName] = () => {
		canvas.initialize(p, h);
	};
}

export function setupMenuCanvaHandlers(p: p5, h: Hydra) {
	for (let [key, syntheticVision] of SyntheticVisionManager.getInstance().getAllItems()) {
		if (key === SyntheticsVisions.Menu || key === SyntheticsVisions.Intro)
			continue;

		setMenuHandler(SyntheticVisionManager.getInstance().getItem(SyntheticsVisions.Menu)!, syntheticVision, 'on' + key + 'Canva', p, h);
	}
}