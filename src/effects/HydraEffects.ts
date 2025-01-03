// @ts-ignore
import Hydra from "hydra-synth";

class HydraEffects {
	static blackScreen(h: Hydra): Hydra {
		return h.solid(0, 0, 0)
	}

	static TVStatic(h: Hydra): Hydra {
		return h.osc(60, 0.1, 1.5)
	}
}

export default HydraEffects;