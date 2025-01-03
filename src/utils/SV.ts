import p5 from "p5";
import FontManager from "../managers/FontManager";

class SV {
	static text(p:p5, text: string, color: string, font: string, size: number, x: number, y: number): void {
		p.textFont(FontManager.getFont(font))
		p.textAlign(p.CENTER, p.CENTER)
		p.fill(color)
		p.textSize(size)
		p.text(text, x, y)
	}
}

export default SV;