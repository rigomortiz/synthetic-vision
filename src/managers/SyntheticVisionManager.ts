import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import SyntheticVisionAbstract from "../SyntheticVisionAbstract";
import FontManager from "./FontManager";
import {FontPaths} from "../enums/Fonts";
import {SoundPaths} from "../enums/Sounds";
import SoundManager from "./SoundManager";


class SyntheticVisionManager {
  private static instance: SyntheticVisionManager;
  private readonly items: Map<string, SyntheticVisionAbstract>;

  private constructor() {
    this.items = new Map<string, any>();
  }

  public static getInstance(): SyntheticVisionManager {
    if (!SyntheticVisionManager.instance) {
      SyntheticVisionManager.instance = new SyntheticVisionManager();
    }

    return SyntheticVisionManager.instance;
  }

  public addItem(key: string, item: SyntheticVisionAbstract): void {
    this.items.set(key, item);
  }

  public getItem(key: string): SyntheticVisionAbstract | undefined {
    return this.items.get(key);
  }

  public removeItem(key: string): void {
    this.items.delete(key);
  }

  public getAllItems(): Map<string, SyntheticVisionAbstract> {
    return this.items;
  }

  public static preload(p: p5): void {

    for (let [key, syntheticVision] of SyntheticVisionManager.getInstance().getAllItems()) {
      syntheticVision.preload(p);
    }
  }

  public static setup(p: p5, h: Hydra): void {
    for (let [key, syntheticVision] of SyntheticVisionManager.getInstance().getAllItems()) {
      syntheticVision.setup(p, h);
    }
  }

  public static draw(p: p5): void {
    for (let [key, syntheticVision] of SyntheticVisionManager.getInstance().getAllItems()) {
      syntheticVision.draw(p);
    }
  }

  public static hydra(h: Hydra, p: p5): void {
    for (let [key, syntheticVision] of SyntheticVisionManager.getInstance().getAllItems()) {
      if (syntheticVision.active) {
        syntheticVision.hydra(h, p, syntheticVision.active);
      }
    }
  }

  public static keyPressed(p: p5, h: Hydra): void {
    for (let [key, syntheticVision] of SyntheticVisionManager.getInstance().getAllItems()) {
      syntheticVision.keyPressed(p, h);
    }
  }

}

export default SyntheticVisionManager;