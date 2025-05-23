import {Paths} from "./Paths";

export enum Sounds {
	EncryptedNode = 'EncryptedNode',
	NoFuture = 'NoFuture',
	Noise = 'Noise',
}

export const SoundPaths: Map<string, string> = new Map<string, string>([
	//[Sounds.EncryptedNode, Paths.EncryptedNode],
	//[Sounds.NoFuture, Paths.NoFuture],
	[Sounds.Noise, Paths.Noise],
]);
