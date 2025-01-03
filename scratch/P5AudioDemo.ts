import * as p5 from "p5";
// @ts-ignore
import Hydra from "hydra-synth";
import {MatrixColors} from "../src/enums/Colors";
import {ColorUtil} from "../src/utils/ColorUtil";


const P5AudioDemo = (p: p5, h: Hydra) => {
  class Particle {
    private x: number;
    private y: number;
    private r: number;
    private xSpeed: number;
    private ySpeed: number;
    private colors = [MatrixColors.Green_1, MatrixColors.Green_2, MatrixColors.Green_3, MatrixColors.Green_4];

    constructor() {
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      this.r = Math.random() * 5 + 5;
      this.xSpeed = Math.random() * 2 - 1;
      this.ySpeed = Math.random() * 2 - 1;
    }

    update(level: number) {
      this.moveParticle()
      this.r = p.map(level, 0, 0.1, 5, 10);
    }

    display(p: p5) {
      p.noStroke();
      p.fill(ColorUtil.randomByName("Matrix"));
      p.circle(this.x, this.y, this.r);
    }

    createParticle(p: p5) {
      p.noStroke();
      p.fill(ColorUtil.random(this.colors));
      p.circle(this.x, this.y, this.r);
    }

    moveParticle() {
      if (this.x < 0 || this.x > window.innerWidth)
        this.xSpeed *= -1;
      if (this.y < 0 || this.y > window.innerHeight)
        this.ySpeed *= -1;
      this.x += this.xSpeed;
      this.y += this.ySpeed;
    }

    joinParticles(p: p5, particles: Particle[], waveform: number[]) {
      particles.forEach(element => {
        p.beginShape();
        let dis = p.dist(this.x, this.y, element.x, element.y);
        if (dis < 85) {
          p.stroke(MatrixColors.Green_2);
          p.strokeWeight(waveform[0]);
          p.line(this.x, this.y, element.x, element.y);
        }
        p.endShape();
      });
    }

  }

  let particles: Array<Particle> = [];

  let canvas;
  let fft: p5.FFT;
  let osc: p5.TriOsc;
  let sine: p5.Oscillator;
  let font: p5.Font, fontsize = 64;
  let mic: p5.AudioIn, analyzer: p5.Amplitude;
  let sound: p5.SoundFile;
  let mediaPlayer: p5.MediaElement;
  const fontPaths = {
    fontTerminus: '/fonts/terminus/TerminusTTF-4.49.2.ttf',
  };

  p.preload = () => {
    font = p.loadFont(fontPaths.fontTerminus);
    //mediaPlayer = p.createAudio("/audio/NoFuture-Prod-end.mp3");
    sound = p.loadSound("/audio/NoFuture-Prod-end.mp3");
  };

  p.setup = () => {
    canvas = p.createCanvas(window.innerWidth, window.innerHeight);
    p.noCursor();
    p.noLoop();
    p.textSize(fontsize);
    p.textAlign(p.CENTER, p.CENTER)
    p.textFont(font);
    p.describe('A Encrypted Node');
    //p.stroke(0)
    //p.strokeWeight(1)


    // Show the default audio controls.
    //mediaPlayer.showControls();
    //mediaPlayer.play()
    //sound.disconnect();
    //sound.amp(2.0)

    canvas.mouseClicked(togglePlay);
    // @ts-ignore
    fft = new p.constructor.FFT();
    //osc = new p.constructor.TriOsc(440)
    //osc.connect(fft)
    //sound.connect(fft);
    //mediaPlayer.connect(fft);
    // @ts-ignore
    mic = new p.constructor.AudioIn();
    mic.start();
    // @ts-ignore
    analyzer = new p.constructor.Amplitude();
    analyzer.setInput(mic);
    //analyzer.setInput(sound);
    //analyzer.setInput(mediaPlayer);

    for (let i = 0; i < window.innerWidth / 10; i++) {
      particles.push(new Particle());
    }
  };

  function togglePlay() {
    //osc.start();
  }

  p.draw = () => {

    let level = analyzer.getLevel();
    let col = p.map(level, 0, 0.5, 0, 255);
    //p.background(col, 100, 255-col);
    if (col > 100) {
      p.clear();

      for (let i = 0; i < particles.length; i++) {
        //particles[i].createParticle(p);
        particles[i].display(p);
        particles[i].update(level);
        particles[i].joinParticles(p, particles.slice(i), fft.waveform());
      }
    }
   //p.background(Matrix.Black);
    /*
    for (let i = 0; i < particles.length; i++) {
      particles[i].display(p);
      particles[i].update(level);
      particles[i].joinParticles(p, particles.slice(i), fft.waveform());
    }*/

    /*
    for(let i = 0; i < 20; i++) {
      let barHeight = p.map(level, 0, 1, 20, p.height);
      let x = p.width * i / 20;
      p.rect(x, p.height - barHeight, p.width/22, barHeight);
    }*/

    // Map level to circle size
    let diameter = p.map(level, 0, 0.1, 10, 200);





    let spectrum = fft.analyze();
    p.noStroke();
    p.fill(255, 0, 0);

    for (let i = 0; i < spectrum.length; i++) {

      let x = p.map(i, 0, spectrum.length, 0, p.width);
      let h = p.map(spectrum[i], 0, 0.1, p.height, -1000);
      //p.fill(255);
      //p.circle(h , x, 10);
      //p.rect(x, p.height, p.width / spectrum.length, h )
    }



    let waveform = fft.waveform();
    p.noFill();
    p.beginShape();
    p.stroke(20);

    for (let i = 0; i < waveform.length; i++){
      let x = p.map(i, 0, waveform.length, 0, p.width);
      let y = p.map( waveform[i], -1, 1, 0, p.height);
      p.vertex(x,y);
    }
    p.endShape();


    // Draw circle
    p.fill(MatrixColors.Black);
    p.noStroke();
    p.circle(p.width/2, p.height/2, diameter);

    p.textAlign(p.CENTER);
    p.fill(255);
    p.text('tap to play', p.width/2, 20);
    p.text("encrypted-node.py", p.width / 2, p.height / 2)
    //osc.freq(p.map(p.mouseX, 0, p.width, 100, 2000));
    //osc.amp(p.map(p.mouseY, 0, p.height, 1, 0));

  };

  p.keyPressed = () => {

  }

  p.mousePressed = () => {
    p.clear();
    if (sound.isPlaying()) {
      // .isPlaying() returns a boolean
      sound.pause();
    } else {
      sound.play();
    }
  }

  h.s0.init({src: p.createCanvas(window.innerWidth, window.innerHeight).elt});

  //h.osc(10, 0, () => fft.analyze()[0]*4).out(h.o0)
  h.noise(2)
    .color(0, 1, 0)
    .modulate(h.o0,()=> fft.analyze()[2]*.5) // listening to the 2nd band
    .out()

  h.update = ()=> {
    p.redraw();
  }
  
};

export default P5AudioDemo;