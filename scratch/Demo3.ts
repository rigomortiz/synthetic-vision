import * as p5 from "p5"
// @ts-ignore
import Hydra from "hydra-synth";


const Demo3P5Hydra = (p: p5, h: Hydra) => {

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.noCursor();
    p.noLoop();
    p.clear()
    p.colorMode(p.HSB)
    p.stroke(0)
    p.strokeWeight(1)
  }

  p.draw = () => {
    //if(p.random() < 0.01) p.clear()
    p.fill(h.time*100%200, 70, 100)
    let xMouseRand = p.mouseX + p.random(-10, 10)
    let yMouseRand = p.mouseY + p.random(-10, 10)
    //p.circle(p.random()*p.width, p.abs(p.sin(h.time*2))*p.height, 10)
    p.circle(xMouseRand, yMouseRand, 10)
  }

  p.mousePressed = () => {
    p.clear();
  }

  h.s0.init({src: p.createCanvas(window.innerWidth, window.innerHeight).elt});


  h.src(h.o0)
    .scale(1.05)
    .blend(h.src(h.o0).brightness(-.02),.4)
    .modulateHue(h.o0,200)
    .layer(h.s0)
    .out()

  h.update = (dt: number)=> {
    console.log(dt)
    p.redraw();
  }

}

export default Demo3P5Hydra;
