import * as p5 from "p5";

export default class ModelManager {
	private static objects: Map<string, p5.Geometry> = new Map<string, p5.Geometry>();

	static preloadModels(p: p5, modelPaths: Map<string, string>): void {
		for (let [key, path] of modelPaths)
			this.objects.set(key, p.loadModel(path, true));
	}

	static getModel(key: string): p5.Geometry {
		return this.objects.get(key)!;
	}

	static getModels(): Map<string, p5.Geometry> {
		return this.objects;
	}
}