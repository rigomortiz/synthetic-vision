import {Paths} from "./Paths";

export enum Fonts {
	Terminus = "Terminus",
	Tiny5 = "Tiny5",
	TypeWrite = "TypeWrite",
	Volunmo = "Volunmo",
	NotoSans = "NotoSans",
}

export const FontPaths: Map<string, string> = new Map<string, string>([
	[Fonts.Terminus, Paths.Terminus],
	[Fonts.Tiny5, Paths.Tiny5],
	[Fonts.TypeWrite, Paths.TypeWrite],
	[Fonts.Volunmo, Paths.Volunmo],
	[Fonts.NotoSans, Paths.NotoSans],
]);