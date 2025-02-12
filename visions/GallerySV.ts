import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import {Paths} from "../src/enums/Paths";
import GLTFL from "../src/utils/GLTFL";
import SyntheticVisionAbstract from "../src/SyntheticVisionAbstract";
import * as THREE from "three";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";

class IframeCSS3Object {
    object: CSS3DObject;

    constructor( x: number, y: number, z: number, rotation: number, scale: number) {
        const div: HTMLDivElement = document.createElement('div');
        div.style.width = window.innerWidth + 'px';
        div.style.height = window.innerHeight + 'px';
        div.style.backgroundColor = '#000';

        const iframe: HTMLIFrameElement = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = '10px';
        iframe.src = "/gallery/genuary/2025";
        div.appendChild(iframe);

        const object = new CSS3DObject(div);
        object.position.set(x, y, z);
        object.name = "iframe";
        object.rotation.x = rotation;
        object.scale.multiplyScalar(scale);
        object.userData = { clicked: false };

        this.object = object;
    }
}


class GallerySV extends SyntheticVisionAbstract {
  cssRenderer: CSS3DRenderer | undefined;
  title: string = "Gallery";
  humanVisionSystemPromise: Promise<GLTF> | undefined;
  fontPromise: Promise<Font> | undefined;
  monitor: THREE.Group | undefined;
  pressEnterMaterial: THREE.MeshBasicMaterial | undefined;
  ambientLight: THREE.AmbientLight = new THREE.AmbientLight("#FFFFFF");
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
    days: number[] = Array.from({ length: 30 }, (_, i) => i + 1);
    raycaster: THREE.Raycaster = new THREE.Raycaster();
    pointer: THREE.Vector2 = new THREE.Vector2();
    iframe: IframeCSS3Object | undefined;
    pivot: THREE.Object3D = new THREE.Object3D();

    constructor() {
        super(true, "webgl", true);

    }

    preload(p: p5): void {
        const gltfLoader = new GLTFLoader();
        const fontLoader = new FontLoader();
        this.humanVisionSystemPromise = gltfLoader.loadAsync("/gltf/surveillance-room/scene.gltf");
        this.fontPromise = fontLoader.loadAsync(Paths.OptimerBold);
    }

    twoDigit(num: number): string {
        return num.toString().padStart(2, '0');
    }

    setup(p: p5, h: Hydra): void {
        p.describe(this.title);
        this.humanVisionSystemPromise!.then((monitor: GLTF): void => {
            this.monitor = monitor.scene;
            console.log(GLTFL.dumpObject(this.monitor).join('\n'));
            this.monitor.position.set(0, 0, 0);
            this.monitor.scale.multiplyScalar(1);
            this.monitor.rotation.set(0, 0, 0);
            this.monitor.traverse((object: any): void => {
                if (object.name === "BezierCurve_0") {
                    object.visible = false
                } else if (object.name === "Object_6" || object.name === "Object_7" || object.name === "Object_8") {
                    object.material = new THREE.MeshPhongMaterial({
                        color: 0x000000,
                          polygonOffset: false,
                          polygonOffsetFactor: 1,
                          polygonOffsetUnits: 1,
                          vertexColors: true,
                          wireframe: false,
                          flatShading: false,
                          wireframeLinewidth: 5
                      });
                    object.geometry.computeVertexNormals();
                } else if (object.name === "Object_10" || object.name === "Object_11") {
                    object.material = new THREE.MeshPhongMaterial({
                        color: 0x353839,
                        polygonOffset: true,
                        polygonOffsetFactor: 2,
                        polygonOffsetUnits: 2,
                        flatShading: false,
                        vertexColors: false,
                        wireframe: false,
                        wireframeLinewidth: 1
                      });
                    object.geometry.computeVertexNormals();
                } else if (object.name === "Object_13") {
                    object.material = new THREE.MeshPhongMaterial({
                        color: 0x00ff00,
                        polygonOffset: true,
                        polygonOffsetFactor: 1,
                        polygonOffsetUnits: 1,
                        flatShading: true,
                        vertexColors: false,
                        wireframe: false,
                        wireframeLinewidth: 1
                      });
                    object.geometry.computeVertexNormals();
                } else if (object.name === "Object_15") {
                    object.material = new THREE.MeshPhongMaterial({
                        color: 0xffffff,
                        polygonOffset: true,
                        polygonOffsetFactor: 1,
                        polygonOffsetUnits: 1,
                        flatShading: true,
                        vertexColors: false,
                        wireframe: false,
                        wireframeLinewidth: 1
                      });
                    object.geometry.computeVertexNormals();
                }
            });
            this.monitor.userData = { clicked: false };
            this.pivot.add(this.monitor);
            this.pivot.position.set(-2, 2, -3);
            this.scene!.add(this.pivot);
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
            this.textMesh.position.set(0, 1.5, 0);
            this.scene!.add(this.textMesh);

        });

        this.scene!.add(this.ambientLight);
        this.directionalLight.position.set(1, 1, 1).normalize();
        this.scene!.add(this.directionalLight);

        document.addEventListener( 'mousemove', this.onPointerMove.bind(this));
        document.addEventListener('click', this.onPointerClick.bind(this));
    }


    onPointerClick(event: MouseEvent): void {

        this.raycaster.setFromCamera(this.pointer, this.camera!);
        const intersects: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[] =
            this.raycaster.intersectObjects(this.scene!.children, true);

        if (intersects.length > 0) {
            const object: THREE.Object3D<THREE.Object3DEventMap> = intersects[0].object;
            console.log(GLTFL.dumpObject(object.parent).join('\n'));
            if (object.parent?.parent?.name === "GLTF_SceneRootNode") {
                this.monitor!.userData.clicked = !this.monitor!.userData.clicked;
                if (this.monitor!.userData.clicked) {
                    /*this.monitor!.scale.set(2, 2, 2);
                    this.camera!.position.x = 0
                    this.camera!.position.y = 0
                    this.camera!.position.z = 3
                    this.camera!.lookAt(this.scene!.position);
                    */
                    this.cssRenderer = new CSS3DRenderer();
                    this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
                    this.cssRenderer.domElement.style.position = 'absolute';
                    this.cssRenderer.domElement.style.zIndex = '1';
                    this.cssRenderer.domElement.style.top = '0';
                    this.iframe = new IframeCSS3Object(0, 0, 0, Math.PI / 2, 0.005);
                    document.body.appendChild(this.cssRenderer.domElement);
                    // Posicionar y escalar el iframe para que coincida con el objeto GLTF
                    this.iframe.object.position.copy(object.position);
                    this.iframe.object.position.z = object.position.z - 1;
                    this.iframe.object.rotation.copy(object.rotation);
                    // iframe.scale.copy(object.scale);

                    this.scene!.add(this.iframe.object);
                } else {
                    //this.monitor!.position.set(-2, 2, -3);
                    //this.monitor!.scale.multiplyScalar(1);
                    //this.monitor!.rotation.set(0, 0, 0);
                }
            }
        }
    }

    onPointerMove( event: MouseEvent ): void {
        this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }

    draw(p: p5): void {
        const time: number = performance.now() * 0.0003;
        /*
         if (!this.monitor!.userData.clicked) {
                     p.cursor(p.HAND);

            this.camera!.position.x = 3 * Math.cos(time);
            this.camera!.position.z = 3 * Math.sin(time);
            this.camera!.lookAt(this.scene!.position);
          }*/
        this.pivot.rotation.y = time;
        this.controls!.update();
        this.renderer!.render(this.scene!, this.camera!);
        this.cssRenderer!.render(this.scene!, this.camera!);
    }

    hydra(h: Hydra, p: p5, active: boolean = true): void {
        if (active)
            h.osc(10, 0.1, Math.PI / 2)
              .color(0, 3, 0)
              .layer(h.src(h.s0).add(h.src(h.o0).scale((): number => 1 - p.cos(h.time/4)/2), .4)
                  .add(h.src(h.o0).scale((): number => 1 + p.sin(h.time/4)/2), .48)
                  .modulateScale(h.noise(1000), .03))
              .blend(h.noise(3))
              .rotate(0.5)
              .scrollX(0.1, 0.1)
              .scrollY(0.1, -0.1)
              .modulate(h.osc(0.2, 0.05).rotate(Math.PI / 2))
              .out(h.o0)

        h.render(h.o0);

    }

    onBackCanva: () => void = (): void => {
    }
    keyPressed(p: p5, h: Hydra): void {
    }
}

export default GallerySV;