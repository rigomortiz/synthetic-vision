import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import FontManager from "./managers/FontManager";
import {FontPaths} from "./enums/Fonts";
import SoundManager from "./managers/SoundManager";
import {SoundPaths, Sounds} from "./enums/Sounds";

export enum SyntheticsVisions {
  Intro = "Intro",
  Menu = "Menu",
}

abstract class SyntheticVisionAbstract {
  private _active: boolean = false;
  private _canvas!: p5.Renderer;
  private readonly _renderer: p5.RENDERER;
  private _mic: p5.AudioIn | undefined;
  private _fft: p5.FFT | undefined;
  private _amplitude: p5.Amplitude | undefined;
  private _fonts: Map<string, p5.Font> = new Map<string, p5.Font>();

  private _sounds: Map<string, p5.SoundFile> = new Map<string, p5.SoundFile>();
  private _sound: p5.SoundFile | undefined;

  abstract preload(p: p5): void;
  abstract setup(p: p5, h: Hydra): void;
  abstract draw(p: p5): void;
  abstract hydra(h: Hydra, p: p5, active: boolean): void;
  abstract keyPressed(p: p5, h: Hydra): void;
  abstract onBackCanva: () => void;

  constructor(active: boolean = false, renderer: p5.RENDERER = "webgl") {
    this._active = active;
    this._renderer = renderer;
  }

  initialize(p: p5, h: Hydra): void {
    FontManager.preloadFonts(p, FontPaths);
    //SoundManager.preloadSounds(p, SoundPaths);
    this._fonts = FontManager.getFonts();
    //this._sounds = SoundManager.getSounds();

    this._canvas = p.createCanvas(window.innerWidth, window.innerHeight, this.renderer);
    this._active = true;
    p.noCursor();
    p.colorMode(p.RGB);
    p.noLoop();
    h.s0.init({src: this.canvas.elt});
    this.initMic(p);
    this.setup(p, h);
  }

  initMic(p: p5): void {
    this._mic = this.initMicrophone(p);
    this._fft = this.initFFT(p, "mic");
    this._amplitude = this.initAmplitude(p, "mic");
  }

  initSound(p: p5, soundPath: string): void {
    this._sound = this._sounds.get(soundPath)!;
    this._fft = this.initFFT(p, "sound");
    this._amplitude = this.initAmplitude(p, "sound");
  }

  initMicrophone(p: p5): p5.AudioIn {
    // @ts-ignore
    let mic: p5.AudioIn = new p.constructor.AudioIn();
    mic.start();
    return mic;
  }

  initFFT(p: p5, type: string): p5.FFT {
    // @ts-ignore
    let fft: p5.FFT = new p.constructor!.FFT();
    if (type === "mic") {
      this.mic!.connect(fft);
    } else if (type === "sound") {
      this.sound!.connect(fft);
    }
    return fft;
  }

  initAmplitude(p: p5, type: string): p5.Amplitude {
    // @ts-ignore
    let amplitude: p5.Amplitude = new p.constructor!.Amplitude();

    if (type === "mic") {
      this.mic!.connect(amplitude);
    } else if (type === "sound") {
      amplitude.setInput(this.sound!);
      //this.sound!.connect(amplitude);
    }

    return amplitude;
  }

  font(name: string): p5.Font {
    return this._fonts.get(name)!;
  }

  get mic(): p5.AudioIn | undefined {
    return this._mic;
  }

  get sound(): p5.SoundFile | undefined {
    return this._sound;
  }

  get fft(): p5.FFT | undefined {
    return this._fft;
  }

  get amplitude(): p5.Amplitude | undefined {
    return this._amplitude;
  }


  get renderer(): p5.RENDERER {
    return this._renderer;
  }

  remove(): void {
    this.canvas.remove();
    this.canvas.elt.remove();
    this._active = false;
  }

  get active(): boolean {
    return this._active;
  }

  activate(): void {
    this._active = true;
  }

  get canvas(): p5.Renderer {
    return this._canvas;
  }
}

export default SyntheticVisionAbstract;