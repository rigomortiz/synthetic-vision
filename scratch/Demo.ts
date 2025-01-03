import * as p5 from "p5"
// @ts-ignore
import Hydra from "hydra-synth";


const DemoP5Hydra = (p: p5, h: Hydra) => {
  let font: p5.Font;
  let fontsize: number = 64;
  let time: number = 0;

  h.osc(40,0).thresh().kaleid(3).out()

  //h.s0.init({src: p.createCanvas(window.innerWidth, window.innerHeight).elt});
  /*
  p.rect(300, 100, 100, 100)
  p.clear()
  for(var i = 0; i < 100; i++){
    p.fill(i*10, i%30, 255)
    p.rect(i*20, 200, 10,200)
  }*/


  //hydra.osc(60, 0.1, 1.5).out(hydra.o0)

  //hydra.voronoi(10, 0).out(hydra.o0)


  //hydra.s0.initCam() // initialize a webcam in source buffer s0
  //hydra.src(hydra.s0).out() // render source buffer s0


  /*
  h.src(h.o0)
    .rotate(0.1)
    .scale(1.05)
    .blend(h.src(h.o0).brightness(-.02),.4)
    .modulateHue(h.o0,100)
    .layer(h.s0)
    .out()
   */

  //h.osc(40,0).thresh().kaleid(3).out()

  //hydra.noise(10, 0).out()




  //hydra.src(hydra.s0).out()


  h.update = (dt: any)=> {
    dt
    p.redraw();
  }

  h.osc(13,0,1)
    .modulate(h.osc(21,0.25,0))
    .modulateScale(h.osc(34))
    .modulateKaleid(h.osc(55),0.1,1)
    .out()



  p.preload = () => {
    // Ensure the .ttf or .otf font stored in the assets directory
    // is loaded before setup() and draw() are called
    font = p.loadFont('/fonts/terminus/TerminusTTF-4.49.2.ttf');
    //sound = p.loadSound("/audio/encrypted_node.wav");
    console.log("preload");
  }

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.textFont(font);
    p.textSize(fontsize);
    p.textAlign(p.CENTER, p.CENTER)
  }

  p.draw = () => {
    //p.background(Matrix.Black);
    //backgroud transparent
    p.background(0, 0, 0, 0);
    // Align the text in the center
    // and run drawWords() in the middle of the canvas
    p.textAlign(p.CENTER);
    p.fill(255);
    p.text("Hello world", p.width / 2, p.height / 2);
    p.fill(p.mouseX/5, p.mouseY/5, 255, 50)
    p.circle(p.mouseX, p.mouseY, 10)


    if(p.random() < 0.01) p.clear()
    p.fill(time*100%200, 70, 100)
    p.rect(p.random()*p.width, p.abs(p.sin(2 * time))*p.height, 50, 50)

    time += 0.01
  }
}

export default DemoP5Hydra;
