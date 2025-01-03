import * as p5 from "p5";

export default class FontManager {
	private static fonts: Map<string, p5.Font> = new Map<string, p5.Font>();

	static preloadFonts(p: p5, fontPaths: Map<string, string>): void {
		for (let [key, path] of fontPaths)
			this.fonts.set(key, p.loadFont(path));
	}

	static getFont(key: string): p5.Font {
		return this.fonts.get(key)!;
	}

	static getFonts(): Map<string, p5.Font> {
		return this.fonts;
	}
}