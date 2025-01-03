import * as p5 from "p5"
// @ts-ignore
import Hydra from "hydra-synth";


const Demo2P5Hydra = (p: p5, h: Hydra) => {
  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
  }

  p.draw = () => {
    p.noStroke();
    //p.fill transparent
    p.fill(255,255,255,50)
    p.ellipse(p.mouseX, p.mouseY, Math.sin(h.time) * 60 + 10)
  }

  p.mousePressed = () => {
    p.clear();
  }

  h.s0.init({src: p.createCanvas(window.innerWidth, window.innerHeight).elt});

  h.solid(0.3, 0.1, 0)
    .mult(h.shape(4,0.8,0).repeat(5,10,0.5))
    .add(h.src(h.s0).scrollX(0.01),-0.5)
    .layer(h.src(h.s0)
      .mult(h.osc()
        .modulate(h.s0)).modulate(h.noise(200), 0.01))
    .blend(h.o0, 0.8)
    .out()

}

export default Demo2P5Hydra;
