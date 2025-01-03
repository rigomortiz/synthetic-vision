import {
	BladeRunnerColors,
	CyberpunkSynthWaveColors,
	GlitchColors,
	MatrixColors,
	NoSignalColors,
	TechnoColors
} from "../enums/Colors";

export class ColorUtil {
	static glitch = [GlitchColors.Red, GlitchColors.Green, GlitchColors.Blue];

	static matrix = [MatrixColors.Green_1, MatrixColors.Green_2, MatrixColors.Green_3, MatrixColors.Green_4];

	static random(colors: string[]): string {
		return colors[Math.floor(Math.random() * colors.length)];
	}

	static randomByName(name: string): string {
		const colors = ColorUtil.getColors(name);

		return colors[Math.floor(Math.random() * colors.length)];
	}

	static getColors(name: string): string[] {
		if (name === "Glitch") return Object.values(GlitchColors);
		if (name === "Matrix") return Object.values(MatrixColors);
		if (name === "Techno") return Object.values(TechnoColors);
		if (name === "BladeRunner") return Object.values(BladeRunnerColors);
		if (name === "NoSignal") return Object.values(NoSignalColors);
		if (name === "CyberpunkSynthWave") return Object.values(CyberpunkSynthWaveColors);

		return [];
	}
}
