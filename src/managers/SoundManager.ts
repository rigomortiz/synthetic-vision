import * as p5 from "p5";

export default class SoundManager {
	private static sounds: Map<string, p5.SoundFile> = new Map<string, p5.SoundFile>();

	static preloadSounds(p: p5, soundPaths: Map<string, string>) {
		for (let [key, path] of soundPaths)
			this.sounds.set(key, p.loadSound(path));
	}

	static getSound(key: string): p5.SoundFile {
		return this.sounds.get(key)!;
	}

	static getSounds(): Map<string, p5.SoundFile> {
		return this.sounds;
	}
}