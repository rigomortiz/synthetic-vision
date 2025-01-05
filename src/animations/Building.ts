import * as p5 from "p5";

class Building {
	  x: number;
	  y: number;
	  w: number;
	  h: number;
	  color: p5.Color;

  constructor(x: number, y: number, p: p5) {
    this.x = x;
    this.y = y;
    this.w = p.random(50, 150);
    this.h = p.random(150, 300);
    this.color = p.color(p.random(100, 255), p.random(100, 255), p.random(100, 255));
  }

  show(p: p5) {
    p.fill(p.red(this.color), p.green(this.color), p.blue(this.color), 100);
    p.rect(this.x - this.w/2, this.y - this.h, this.w, this.h);

    // Ventanas neón
    for (let i = 20; i < this.h; i += 30) {
      for (let j = 10; j < this.w; j += 20) {
        p.fill(255, 0, 255, 100);
        p.rect(this.x - this.w/2 + j, this.y - this.h + i, 10, 10);
      }
    }
  }
  /*
  for (let i = 0; i < 10; i++) {
		    this.buildings[i] = new Building(p.random(p.width), p.height, p);
		  }
   */
}