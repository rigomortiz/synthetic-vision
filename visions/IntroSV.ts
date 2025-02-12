import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import SyntheticVisionManager from "../src/managers/SyntheticVisionManager";
import {Fonts} from "../src/enums/Fonts";
import {NoSignalColors} from "../src/enums/Colors";
import GLTFL from "../src/utils/GLTFL";
import {Paths} from "../src/enums/Paths";
import {SyntheticsVisions} from "../src/enums/SyntheticsVisions";
import SyntheticVisionAbstract from "../src/SyntheticVisionAbstract";

import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
let controls: OrbitControls;

class IntroSV extends SyntheticVisionAbstract {
  title: string = "Synthetic Vision";
  humanVisionSystemPromise: Promise<GLTF> | undefined;
  fontPromise: Promise<Font> | undefined;
  brain: THREE.Group | undefined;
  pressEnterMaterial: THREE.MeshBasicMaterial | undefined;
  ambientLight: THREE.AmbientLight = new THREE.AmbientLight("#00ff00");
  directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight("#ffffff", 1);
  textGeometry: TextGeometry | undefined;
  textMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
          color: 0x0000ff,
          polygonOffset: true,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
          vertexColors: false,
          wireframe: false,
          flatShading: false,
          wireframeLinewidth: 1
      });
  textMesh: THREE.Mesh | undefined;
  materialBrain: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial( {
        color: 0xff0000,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1,
        flatShading: false,
        vertexColors: false,
        wireframe: true,
        wireframeLinewidth: 1
      });


  constructor() {
    super(true, "webgl", true);
  }

  preload(p: p5): void {
    const gltfLoader = new GLTFLoader();
    const fontLoader = new FontLoader();
    this.humanVisionSystemPromise = gltfLoader.loadAsync(Paths.HumanVisionSystem);
    this.fontPromise = fontLoader.loadAsync(Paths.OptimerRegular);
  }

  setup(p: p5, h: Hydra): void {
    p.describe(this.title);
    //controls = new OrbitControls(this.camera!, this.renderer!.domElement);
    //controls.enableDamping = true;

    this.humanVisionSystemPromise!.then((brain: GLTF): void => {
      this.brain = brain.scene;
      //console.log(GLTFL.dumpObject(this.brain).join('\n'));
      this.brain.position.set(-2, -2.5, -2);
      this.brain.scale.multiplyScalar(10);
      this.brain.rotation.set(Math.PI / 8, 0, 0);
      this.brain.traverse((object: any) => {
        //console.log(object);
        if (object.type === "Mesh") {
          object.material = this.materialBrain;
          object.geometry.computeVertexNormals();
        }
      });

      this.scene!.add(this.brain);
    });

    this.fontPromise!.then((font: Font): void => {
      this.textGeometry = new TextGeometry(this.title, {
        font: font,
        size: .5,
        height: .2,
        curveSegments: 6,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 4
      });
      this.textGeometry.center();
      this.textMesh = new THREE.Mesh(this.textGeometry, this.textMaterial);
      this.textMesh.position.set(0, -0.3, 0);
      this.scene!.add(this.textMesh);
    });

    this.scene!.add(this.ambientLight);
    this.directionalLight.position.set(1, 1, 1).normalize();
    this.scene!.add(this.directionalLight);
  }

  draw(p: p5): void {
    const time: number = performance.now() * 0.0003;

    this.camera!.position.x = 3 * Math.cos( time );
    this.camera!.position.z = 3 * Math.sin( time );
    this.camera!.lookAt( this.scene!.position );

     this.renderer!.render(this.scene!, this.camera!);
  }

  drawBionicEye(p: p5): void {
    let radius: number = p.map(this.amplitude!.getLevel(), 0, 1, 10, 200);
    let red: number = p.map(this.amplitude!.getLevel(), 0, 1, 0, 255);
    p.pointLight(255, 0, 0, 0, 0, p.sqrt(p.width**2 + p.height**2));
    p.noStroke();
    p.ambientLight(red, 0, 0);
    p.specularMaterial(255, 0, 0);
    p.translate(0, -100, 0);
    p.sphere(radius);
  }

  keyPressed(p: p5, h: Hydra): void {
    if (p.keyCode === p.ENTER) {
      SyntheticVisionManager.getInstance().getItem(SyntheticsVisions.Intro)!.remove();

      setTimeout((): void => {
        SyntheticVisionManager.getInstance().getItem(SyntheticsVisions.Gallery)!.initialize(p, h);
      }, 500);

    }
  }

  drawText(p: p5): void {
    p.textAlign(p.CENTER, p.CENTER);
    p.textFont(this.font(Fonts.Volunmo));
    p.fill(NoSignalColors.White);
    p.textSize(200);
    p.text(this.title, 0, 0);
    p.textSize(48);
    p.textFont(this.font(Fonts.Terminus));
    p.fill(NoSignalColors.White);
    p.text("PRESS ENTER", 0, 200);


    if (p.frameCount % 60 < 30) {
      p.textSize(48);
      p.textFont(this.font(Fonts.Terminus));
      p.fill(NoSignalColors.Yellow);
      p.text("PRESS ENTER", 0, 200);
    }
  }

  hydra(h: Hydra, p: p5, active: boolean = true): void {
    h.osc(10, 0.1, Math.PI / 2)
      .color(0, 3, 0)
      .layer(h.src(h.s0).add(h.src(h.o0).scale(()=>1 - p.cos(h.time/4)/2), .4)
          .add(h.src(h.o0).scale(()=>1 + p.sin(h.time/4)/2), .48)
          .modulateScale(h.noise(1000), .03))
      .blend(h.noise(3))
      .rotate(0.5)
      .scrollX(0.1, 0.1)
      .scrollY(0.1, -0.1)
      .modulate(h.osc(0.2, 0.05).rotate(Math.PI / 2))
      .out(h.o0)

    h.render(h.o0);
  }

  onBackCanva: () => void = () => {
  };
}

export default IntroSV;