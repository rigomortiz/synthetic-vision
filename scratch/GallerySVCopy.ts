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

import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import * as TWEEN  from "three/examples/jsm/libs/tween.module.js";
class GallerySV extends SyntheticVisionAbstract {
  keyPressed(p: p5, h: Hydra): void {

  }
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
  materialBrain: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial( {
        color: 0xff0000,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1,
        flatShading: false,
        vertexColors: false,
        wireframe: false,
        wireframeLinewidth: 1
      });
    days: number[] = Array.from({ length: 30 }, (_, i) => i + 1);
  raycaster: THREE.Raycaster = new THREE.Raycaster();
  pointer: THREE.Vector2 = new THREE.Vector2();
  //controls: TrackballControls = new TrackballControls(this.camera!, this.renderer!.domElement);
    textureLoader = new THREE.TextureLoader();
    objects: CSS3DObject[] = [];


  constructor() {
    super(true, "webgl", true);
    this.cssRenderer = new CSS3DRenderer();
    this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
    this.cssRenderer.domElement.style.position = 'absolute';
    this.cssRenderer.domElement.style.top = '0';
    document.body.appendChild(this.cssRenderer.domElement);
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

    for (let i = 1; i <= 31; i++) {
    this.textureLoader.load("/gif/jan-" + this.twoDigit(i) + ".gif", (texture) => {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ map: texture });
      const cube = new THREE.Mesh(geometry, material);

      cube.position.set(
        i,
		i,
        0 // z position
      );

      this.scene!.add(cube);
    });
  }


    this.humanVisionSystemPromise!.then((monitor: GLTF): void => {
      this.monitor = monitor.scene;
      console.log(GLTFL.dumpObject(this.monitor).join('\n'));
      this.monitor.position.set(0, 0, 0);
      this.monitor.scale.multiplyScalar(5);
      this.monitor.rotation.set(0, 0, 0);
      this.monitor.traverse((object: any) => {
          if (object.name === "CRT_Monitor_monitor_glass_0") {
                const iframe: CSS3DObject = this.Element(0, 0, 0, Math.PI / 2, 0.005);
                // Posicionar y escalar el iframe para que coincida con el objeto GLTF
                iframe.position.copy(object.position);
                iframe.rotation.copy(object.rotation);
                iframe.scale.copy(object.scale);

                // Añadir el iframe a la escena
                this.scene!.add(iframe);

                // Hacer invisible el objeto original si es necesario
                object.visible = false;

            /*
            // Clone the original mesh
            const clonedMesh = object.clone();
            clonedMesh.material = new THREE.MeshBasicMaterial({ visible: false }); // Make the cloned mesh invisible
            clonedMesh.add(iframe); // Add the iframe to the cloned mesh

            if (object.parent) {
              object.parent.add(iframe); // Add the cloned mesh to the same parent
              object.parent.remove(object); // Remove the original mesh
            }
            console.log(object);
            console.log(iframe);
           // object.parent.add(iframe);
            //object.parent.remove(object);

             */
          }
      });

      // Add gif elements
        for (let i = 1; i <= 10; i++) {
         //   this.scene!.add(this.elementGift(i, (i % 5) * 2 - 4, Math.floor(i / 5) * 2 - 4, 0, 0));
        }




        this.monitor.userData = { clicked: false };
      this.scene!.add(this.monitor);
    });


   // this.scene!.add(iframe);
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

    document.addEventListener( 'mousemove', this.onPointerMove.bind(this) );
      document.addEventListener('click', this.onPointerClick.bind(this));
  }


onPointerClick(event: MouseEvent): void {

  this.raycaster.setFromCamera(this.pointer, this.camera!);
  const intersects = this.raycaster.intersectObjects(this.scene!.children, true);

  if (intersects.length > 0) {
    const object = intersects[0].object;
    console.log(GLTFL.dumpObject(object.parent).join('\n'));
    if (object.parent?.name === "CRT_Monitor") {
      this.monitor!.userData.clicked = !this.monitor!.userData.clicked;
      if (this.monitor!.userData.clicked) {
        this.monitor!.scale.set(7, 7, 7);
      } else {
        this.monitor!.scale.set(5, 5, 5);
      }
    }
  }
}

    onPointerMove( event: MouseEvent ): void {

				this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			}

  Element( x: number, y: number, z: number, rotation: number, scale: number): CSS3DObject {
      const div: HTMLDivElement = document.createElement( 'div' );
      div.style.width = window.innerWidth + 'px';
      div.style.height = window.innerHeight + 'px';
      div.style.backgroundColor = '#000';

      const iframe: HTMLIFrameElement = document.createElement( 'iframe' );
      iframe.style.width = '100%';
      iframe.style.height = '100%';
   //   iframe.style.border = '0px';
      iframe.src = "/gallery";
      div.appendChild( iframe );

      const object = new CSS3DObject( div );
      object.position.set( x, y, z );
      object.name = "iframe";
      object.rotation.x = rotation;
      object.scale.multiplyScalar(scale);
      object.userData = { clicked: false };

      return object;
  }

  elementGift(n: number, x: number, y: number, z: number, ry: number ): CSS3DObject {
        const img: HTMLImageElement = document.createElement('img');
        img.src = "/gif/jan-" + this.twoDigit(n) + ".gif";
        img.width = 100;
        img.height = 100;
        img.style.border = '0px';
        img.style.borderRadius = '10px';
        img.style.backgroundColor = '#000';
        img.style.padding = '10px';
        img.style.margin = '10px';

        const object = new CSS3DObject( img );
        object.position.set( x, y, z );
        object.rotation.y = ry;
        object.name = "gif" + n;
        object.scale.multiplyScalar(0.005);

        return object;
  }

  draw(p: p5): void {
    const time: number = performance.now() * 0.0003;

     /*if (!this.monitor!.userData.clicked) {
        this.camera!.position.x = 3 * Math.cos(time);
        this.camera!.position.z = 3 * Math.sin(time);
        this.camera!.lookAt(this.scene!.position);
      }*/
    this.controls!.update();
    this.renderer!.render(this.scene!, this.camera!);
     this.cssRenderer!.render(this.scene!, this.camera!);
  }

  /*transform( targets, duration ) {

				TWEEN.removeAll();

				for ( let i = 0; i < this.objects.length; i ++ ) {

					const object = this.objects[ i ];
					const target = targets[ i ];

					new TWEEN.Tween( object.position )
						.to( { x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration )
						.easing( TWEEN.Easing.Exponential.InOut )
						.start();

					new TWEEN.Tween( object.rotation )
						.to( { x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration )
						.easing( TWEEN.Easing.Exponential.InOut )
						.start();

				}

				new TWEEN.Tween( this )
					.to( {}, duration * 2 )
					.onUpdate( this.renderer!.render( this.scene!, this.camera !) )
					.start();

			}*/

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

export default GallerySV;