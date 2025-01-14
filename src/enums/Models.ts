import {Paths} from "./Paths";

export enum Models {
	OneDollarBill = "OneDollarBill",
}

export const ModelPaths: Map<string, string> = new Map<string, string>([
	[Models.OneDollarBill, Paths.OneDollarBill],
]);