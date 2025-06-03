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
import SyntheticVisionManager from "../src/managers/SyntheticVisionManager";
import { SyntheticsVisions } from "../src/enums/SyntheticsVisions";

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


class CiudadSinRecuerdosSV extends SyntheticVisionAbstract {
  cssRenderer: CSS3DRenderer | undefined;
  title: string = "Ciudad sin recuerdos";
  cameraObjectPromise: Promise<GLTF> | undefined;
  photoObjectPromise: Promise<GLTF> | undefined;
  fontPromise: Promise<Font> | undefined;
  camaraObject: THREE.Group | undefined;
  photoObject: THREE.Group | undefined;

  pressEnterMaterial: THREE.MeshBasicMaterial | undefined;
  ambientLight: THREE.AmbientLight = new THREE.AmbientLight(0xffffff, 7);
  directionalLight: THREE.DirectionalLight = new THREE.DirectionalLight(0xffffff, 7);
  pointLight: THREE.PointLight = new THREE.PointLight( 0xffffff, 4.5, 0, 0 );

  textGeometry: TextGeometry | undefined;
  textMaterial: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial({
          color: 0x000000,
          polygonOffset: false,
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
          vertexColors: false,
          wireframe: false,
          wireframeLinewidth: 1,
            flatShading: true
      });
    textMesh: THREE.Mesh | undefined;
    days: number[] = Array.from({ length: 30 }, (_, i) => i + 1);
    raycaster: THREE.Raycaster = new THREE.Raycaster();
    pointer: THREE.Vector2 = new THREE.Vector2();
    iframe: IframeCSS3Object | undefined;
    pivot: THREE.Object3D = new THREE.Object3D();
    private p: p5 | undefined;
    private h: Hydra | undefined;

    constructor() {
        super(true, "webgl", true);

    }

    preload(p: p5): void {
        const gltfLoader = new GLTFLoader();
        const fontLoader = new FontLoader();
        this.cameraObjectPromise = gltfLoader.loadAsync("/gltf/speed_graphic_camera/scene.gltf");
        this.photoObjectPromise = gltfLoader.loadAsync("/gltf/polaroid_photo_sample/scene.gltf");
        this.fontPromise = fontLoader.loadAsync(Paths.OptimerBold);
    }

    twoDigit(num: number): string {
        return num.toString().padStart(2, '0');
    }

    camara(): void {
        this.cameraObjectPromise!.then((camaraObject: GLTF): void => {
            this.camaraObject = camaraObject.scene;
            this.camaraObject.position.set(0, -1, 0);
            this.camaraObject.scale.multiplyScalar(10);
            this.camaraObject.rotation.set(0, Math.PI, 0);
            this.pivot.add(this.camaraObject);
            this.pivot.position.set(0, 0, 0);
            this.scene!.add(this.pivot);
        });
    }

    photo(): void {
        this.photoObjectPromise!.then((photoObject: GLTF): void => {
            this.photoObject = photoObject.scene;
            console.log(GLTFL.dumpObject(this.photoObject).join('\n'));
            this.photoObject.position.set(2, 0, 2);
            this.photoObject.scale.multiplyScalar(0.05);
            this.photoObject.rotation.set(Math.PI/4, Math.PI/4, 0);
            this.photoObject.userData = { clicked: false };
            this.scene!.add(this.photoObject);
        });
    }

    text(): void {
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
            this.textMesh.position.set(0, 4, 0);
            this.scene!.add(this.textMesh);
        });
    }

    setup(p: p5, h: Hydra): void {
        p.describe(this.title);
        this.p = p;
        this.h = h;
        this.camara();
        this.photo();
        this.text();

        this.pointLight.color.setHSL( Math.random(), 1, 0.5 );
        this.pointLight.position.set( 0, 100, 90 );
        this.directionalLight.position.set(0,0,1).normalize();
        this.scene!.add(this.directionalLight);

        this.scene!.add(this.ambientLight);
        this.scene!.add(this.pointLight );
       // this.scene!.background = new THREE.Color(0xFDFCEB);

        this.camera!.position.z = 7;

        document.addEventListener('mousemove', this.onPointerMove.bind(this));
        document.addEventListener('click', this.onPointerClick.bind(this));
    }


    onPointerClick(event: MouseEvent): void {
        this.raycaster.setFromCamera(this.pointer, this.camera!);
        const intersects: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[] =
            this.raycaster.intersectObjects(this.scene!.children, true);

        if (intersects.length > 0) {
            const object: THREE.Object3D<THREE.Object3DEventMap> = intersects[0].object;
            console.log(GLTFL.dumpObject(object.parent).join('\n'));
            console.log(object.parent?.name)
            if (object.parent?.name === "Object_2") {
                this.photoObject!.userData.clicked = !this.photoObject!.userData.clicked;
                if (this.photoObject!.userData.clicked) {
                    this.remove();
                    setTimeout((): void => {
                        window.open("http://localhost:3000/live/ciudad-sin-recuerdos/opera");
                        //SyntheticVisionManager.getInstance().getItem(SyntheticsVisions.Opera)!.initialize(this.p!, this.h!);
                      }, 500);
                }

            }
        }
    }

    onPointerMove( event: MouseEvent ): void {
        this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera(this.pointer, this.camera!);
        const intersects: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[]= this.raycaster.intersectObjects(this.scene!.children, true);

        if (intersects.length > 0) {
            const object: THREE.Object3D<THREE.Object3DEventMap> = intersects[0].object;
            if (object.parent?.name === "Object_2") {
                document.body.style.cursor = "pointer";
                console.log(this.pointer.x, this.pointer.y);

            } else {
                document.body.style.cursor = "grab";
            }
        } else {
            document.body.style.cursor = "grab";
        }

    }

    draw(p: p5, h: Hydra): void {
        this.controls!.update();
        this.renderer!.render(this.scene!, this.camera!);
        //this.cssRenderer!.render(this.scene!, this.camera!);
    }

    hydra(h: Hydra, p: p5, active: boolean = true): void {
          h.src(h.s0)
			.mult(h.osc(this.fft!.waveform()[0]*2,0.1,()=> Math.tan(h.time*6))
                .saturate(3)
                .kaleid(this.fft!.waveform()[0]*2))
			.modulate(h.o0,0.5)
			.add(h.o0, 0.6)
			.scale(1.2)
			.modulate(h.voronoi(this.fft!.waveform()[0]*2,1),this.fft!.waveform()[0]*2)
			.luma(.1)
			.modulateScale(h.noise(100), .03)
               // .mult(h.osc(107, 0, 0.7).color(1, 0, 1).rotate(0, -0.08).modulateRotate(h.o1, 0.4).out(h.o0))
             .add(
                h.src(h.s0)
                .color(1, 0, 0)
                .scale(1.1))
                //.modulate(h.noise(.77), -0.3), 0.3)
                .modulateScale(h.noise(this.fft!.waveform()[0]*2), .01)
               .brightness(0.5).color(1, 0, 0)
	            .diff(h.src(h.o0).scale(1.2))
              .modulateScale(h.osc(this.fft!.waveform()[0]))

	        //.diff(h.src(h.o0).rotate([-.012,.01,-.002,0]))
		.out()

        h.render(h.o0)

    }

    onBackCanva: () => void = (): void => {
    }
    keyPressed(p: p5, h: Hydra): void {
    }

    mouseMove(p: p5): void {

    }
}

export default CiudadSinRecuerdosSV;