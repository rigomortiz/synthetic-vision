import * as p5 from "p5"
// @ts-ignore
import Hydra from "hydra-synth";
import {MatrixColors, TechnoColors} from "../src/enums/Colors";

const Demo4P5Hydra = (p: p5, h: Hydra) => {
  class Particle {
    x = p.random(0, window.innerWidth);
    y = p.random(0, window.innerHeight);
    r = p.random(1, 10);
    xSpeed = p.random(-2, 2);
    ySpeed = p.random(-1, 1.5);

    colors = [
      MatrixColors.Green_1,
      MatrixColors.Green_2,
      MatrixColors.Green_3,
      MatrixColors.Green_4
    ];

    // setting the co-ordinates, radius and the
    // speed of a particle in both the co-ordinates axes.
    Particle() {

    }

    // creation of a particle.
    createParticle() {
      p.noStroke();
      p.fill(TechnoColors.HologramWhite);
      p.circle(this.x, this.y, this.r);
    }

    // setting the particle in motion.
    moveParticle() {
      if (this.x < 0 || this.x > window.innerWidth)
        this.xSpeed *= -1;
      if (this.y < 0 || this.y > window.innerHeight)
        this.ySpeed *= -1;
      this.x += this.xSpeed;
      this.y += this.ySpeed;
    }

    // this function creates the connections(lines)
    // between particles which are less than a certain distance apart
    joinParticles(particles: Particle[]) {
      particles.forEach(element => {
        let dis = p.dist(this.x, this.y, element.x, element.y);
        if (dis < 85) {
          p.stroke(p.random(this.colors));
          p.line(this.x, this.y, element.x, element.y);
        }
      });
    }
  }

  let particles: Particle[] = [];
  let font: p5.Font, fontsize = 64;
  //let sound: p5.SoundFile;

  p.preload = () => {
    // Ensure the .ttf or .otf font stored in the assets directory
    // is loaded before setup() and draw() are called
    font = p.loadFont('/fonts/terminus/TerminusTTF-4.49.2.ttf');
    //sound = p.loadSound("/audio/encrypted_node.wav");
    console.log("preload");
  }

  p.setup = () => {
    p.createCanvas(window.innerWidth, window.innerHeight);
    p.noCursor();
    p.noLoop();
    p.clear()
    p.textFont(font);
    p.textSize(fontsize);
    p.textAlign(p.CENTER, p.CENTER)
    for (let i = 0; i < window.innerWidth / 5; i++) {
      particles.push(new Particle());
    }
  }

  p.draw = () => {
    p.background(MatrixColors.Black);
    if (p.frameCount % 60 < 10) {
      //p.background(Matrix.Black);
    }

    p.clear()
    p.fill(MatrixColors.Black)
    p.circle(p.mouseX, p.mouseY, p.height/4)
    p.blendMode(p.DIFFERENCE)
    //p.translate(p.noise(p.frameCount*.0051)*p.width, p.noise(p.frameCount*.005)*p.height)
    p.text('encrypted-node.py',p.width/2, p.height/2)

    for (let i = 0; i < particles.length; i++) {
      particles[i].createParticle();
      particles[i].moveParticle();
      particles[i].joinParticles(particles.slice(i));
    }
  }

  p.mousePressed = () => {
    p.clear();
  }

  h.update = (dt: number)=> {
    p.redraw();
  }

  h.s0.init({src: p.createCanvas(window.innerWidth, window.innerHeight).elt});

  h.src(h.s0)
    .add(h.src(h.o0).scale(1), .9)
    .modulateScale(h.noise(1000), .01)
    .out()

  if (p.keyCode === p.ESCAPE) {
    h.tick()
  } else if (p.keyCode === p.ENTER) {
    h.osc(()=> h.mouse.x)
      .rotate(0.5)
      .modulate(h.osc(() => h.mouse.y))
      .out()
  } else if (p.keyCode === p.BACKSPACE) {
    h.osc(60, 0.01, Math.PI / 2).layer(h.src(h.s0)).out(h.o0);
  } else if (p.keyCode === p.UP_ARROW) {
    h.setFunction({
      name: 'chroma',
      type: 'color',
      inputs: [],
      glsl: `
               float maxrb = max( _c0.r, _c0.b );
               float k = clamp( (_c0.g-maxrb)*5.0, 0.0, 1.0 );
               float dg = _c0.g; 
               _c0.g = min( _c0.g, maxrb*0.8 ); 
               _c0 += vec4(dg - _c0.g);
               return vec4(_c0.rgb, 1.0 - k);
            `
    })

    h.setFunction({
      name: 'gradient2',
      type: 'src',
      inputs: [
        {
          type: 'float',
          name: 'speed',
          default: 0,
        }
      ],
      glsl:
        `return vec4(sin(time*speed), _st, 1.0);`
    })

    h.setFunction({
      name: 'negate',
      type: 'combine',
      inputs: [
        { type: 'float', name: 'amount', default: 1 }
      ],
      glsl:`
        _c1 *= amount;
        return vec4(vec3(1.0)-abs(vec3(1.0)-_c0.rgb-_c1.rgb), min(max(_c0.a, _c1.a),1.0));
    `
    })
  }

  /*
if (p.keyCode === p.ESCAPE) {
	h.tick()
} else if (p.keyCode === p.TAB) {
	h.osc(()=> h.mouse.x)
		.rotate(0.5)
		.modulate(h.osc(() => h.mouse.y))
		.out()
} else if (p.keyCode === p.BACKSPACE) {
	h.osc(60, 0.01, Math.PI / 2).layer(h.src(h.s0)).out(h.o0);
}

 */

  /*
  if (!active) return;

    if (h.frameCount % 60 === 0) {
      h.addLayer(1.2, 's');
    }
    h.osc(60, 0.01, Math.PI / 2).layer(h.src(h.s0)).out(h.o0);

    h.render(h.o0);
   */

}

export default Demo4P5Hydra;
