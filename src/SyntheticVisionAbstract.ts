import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

import FontManager from "./managers/FontManager";
import {FontPaths} from "./enums/Fonts";
import SoundManager from "./managers/SoundManager";
import {SoundPaths, Sounds} from "./enums/Sounds";
import {ModelPaths} from "./enums/Models";
import ModelManager from "./managers/ModelManager";

export enum SyntheticsVisions {
  Intro = "Intro",
  Menu = "Menu",
}

abstract class SyntheticVisionAbstract {
  private _active: boolean = false;
  private _canvas!: p5.Renderer;
  private readonly _typeRenderer: p5.RENDERER;
  private _mic: p5.AudioIn | undefined;
  private _fft: p5.FFT | undefined;
  private _amplitude: p5.Amplitude | undefined;
  private _fonts: Map<string, p5.Font> = new Map<string, p5.Font>();
  private _models: Map<string, p5.Geometry> = new Map<string, p5.Geometry>();

  private _sounds: Map<string, p5.SoundFile> = new Map<string, p5.SoundFile>();
  private _sound: p5.SoundFile | undefined;

  abstract preload(p: p5): void;
  abstract setup(p: p5, h: Hydra): void;
  abstract draw(p: p5): void;
  abstract hydra(h: Hydra, p: p5, active: boolean): void;
  abstract keyPressed(p: p5, h: Hydra): void;
  abstract onBackCanva: () => void;

  private _renderer: THREE.WebGLRenderer | CSS3DRenderer | undefined;
  private _scene: THREE.Scene | undefined;
  private _camera: THREE.PerspectiveCamera | undefined;
  private _cameraOrtho: THREE.OrthographicCamera | undefined;
  private _threeActive: boolean = false;
  private _controls: OrbitControls | TrackballControls | undefined;

  constructor(active: boolean = false, typeRenderer: p5.RENDERER = "webgl", threeActive?: boolean) {
    this._active = active;
    this._typeRenderer = typeRenderer;
    this._threeActive = threeActive || false;
  }

  initialize(p: p5, h: Hydra): void {
    FontManager.preloadFonts(p, FontPaths);
    //ModelManager.preloadModels(p, ModelPaths);
    SoundManager.preloadSounds(p, SoundPaths);
    this._fonts = FontManager.getFonts();
    //this._models = ModelManager.getModels();
    this._sounds = SoundManager.getSounds();

    this._canvas = p.createCanvas(window.innerWidth, window.innerHeight, this._typeRenderer);
    this._active = true;

    if (this._threeActive) {
      // Initialize Three.js renderer
      this._renderer = new THREE.WebGLRenderer({ canvas: this._canvas.elt });
      //this._renderer = new CSS3DRenderer({ element: this.canvas.elt });
      this._renderer.setSize(window.innerWidth, window.innerHeight);
      //this.canvas.elt.appendChild(this._renderer.domElement);
      this._renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1))
      // Initialize Three.js scene
      this._scene = new THREE.Scene();
      const frustumSize = 5;
      const aspect = window.innerWidth / window.innerHeight;
      // Initialize Three.js camera
      this._camera = new THREE.PerspectiveCamera(80, aspect, 0.1, 100);
      this._cameraOrtho = new THREE.OrthographicCamera( - frustumSize * aspect, frustumSize * aspect, frustumSize, - frustumSize, 0.1, 100 );

      this._camera.position.z = 3
      this._scene.add(this._camera);
      this._scene.add(this._cameraOrtho);

      this._controls = new OrbitControls(this.camera!, this.renderer!.domElement);
      //this._controls = new TrackballControls(this.camera!, this.renderer!.domElement);
      //his._controls.enableDamping = true;
    }
    h.bpm = 60
   // p.noCursor();
    p.colorMode(p.RGB);
    p.noLoop();
    this.initHydra(p, h);
    this.initMic(p);
    this.setup(p, h);
  }

  initHydra(p: p5, h: Hydra): void {
    h.s0.init({src: this.canvas.elt});
  }

  initScreenCapture(p: p5): void {
    let constraints = {
      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720
        },
        optional: [{ maxFrameRate: 30 }]
      },
      audio: false
    };
    // @ts-ignore
    p.createCapture(constraints);
  }

  initScreenCaptureHydra(p: p5, h: Hydra): void {
    h.s1.initScreen()
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

  set fft(fft: p5.FFT | undefined) {
    this._fft = fft;
  }

  set amplitude(amplitude: p5.Amplitude | undefined) {
    this._amplitude = amplitude;
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

  model(name: string): p5.Geometry {
    return this._models.get(name)!;
  }

  get mic(): p5.AudioIn | undefined {
    return this._mic;
  }

  get sound(): p5.SoundFile | undefined {
    return this._sound;
  }

  set sound(sound: p5.SoundFile | undefined) {
    this._sound = sound;
  }

  get fft(): p5.FFT | undefined {
    return this._fft;
  }

  get amplitude(): p5.Amplitude | undefined {
    return this._amplitude;
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

  hide(): void {
    this.canvas.hide();
  }

  show(): void {
    this.canvas.show();
  }

  get renderer(): THREE.WebGLRenderer | CSS3DRenderer | undefined {
    return this._renderer;
  }

  set renderer(renderer: THREE.WebGLRenderer | CSS3DRenderer | undefined) {
    this._renderer = renderer;
  }

    get scene(): THREE.Scene | undefined {
        return this._scene;
    }

    get camera(): THREE.PerspectiveCamera | undefined {
        return this._camera;
    }

    get controls(): OrbitControls | TrackballControls | undefined {
        return this._controls;
    }

    get threeActive(): boolean {
        return this._threeActive;
    }

    resize(p: p5, h: Hydra): void {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
        h.setResolution(window.innerWidth - 20, window.innerHeight - 20);
        //h.hush();
        h.render()

        /*h = new Hydra({
			canvas: this.canvas.elt,
			width: window.innerWidth - 20,
			height: window.innerHeight - 20,
			makeGlobal: false,
			detectAudio: false,
			precision: "highp",
			autoLoop: true,
			numSources: 4,
			numOutputs: 4,
		}).synth;*/

        if (this._threeActive) {
            this._renderer!.setSize(window.innerWidth, window.innerHeight);
            this._camera!.aspect = window.innerWidth / window.innerHeight;
            this._camera!.updateProjectionMatrix();
        }
    }

}

export default SyntheticVisionAbstract;