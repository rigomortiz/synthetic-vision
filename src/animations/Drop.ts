import * as p5 from "p5";

class Drop {
	  x: number;
	  y: number;
	  z: number;
	  len: number;
	  yspeed: number;

  constructor(p: p5) {
    this.x = p.random(p.width);
    this.y = p.random(-500, -50);
    this.z = p.random(0, 20);
    this.len = p.map(this.z, 0, 20, 10, 20);
    this.yspeed = p.map(this.z, 0, 20, 1, 20);
  }

  fall(p: p5) {
    this.y = this.y + this.yspeed;
    let grav = p.map(this.z, 0, 20, 0, 0.2);
    this.yspeed = this.yspeed + grav;

    if (this.y > p.height) {
      this.y = p.random(-200, -100);
      this.yspeed = p.map(this.z, 0, 20, 4, 10);
    }
  }

  show(p: p5) {
    let thick = p.map(this.z, 0, 20, 1, 3);
    p.strokeWeight(thick);
    p.stroke(0, 255, 70);
    p.line(this.x, this.y, this.x, this.y + this.len);
  }
  /*
  for (let i = 0; i < this.maxDrops; i++) {
		    this.drops[i] = new Drop(p);
	    }
   */
}