import {MatrixColors} from "../enums/Colors";
import {ColorUtil} from "../utils/ColorUtil";
import p5 from "p5";

class Sprectrum {
  static draw2d(p: p5, spectrum: number[], color: string, stroke: number): void {
    let s: number[] = [];
    let j: number = 0;
    let k: number = 8;
    for (let i: number = 0; i < spectrum.length; i+=k) {
      let n: number = 0;
      for (let l: number = 0; l < k; l++) {
        n += spectrum[i + l];
      }
      s[j++] = n
    }

    let w: number = p.width / s.length;
    //p.blendMode(p.DIFFERENCE);
    let e: number = 1;
    let xx: number = p.width/2;
    p.stroke(color);
    p.strokeWeight(stroke);
    for (let i = 0; i < s.length; i++) {
      //let x = i * w - p.width / 2;
      let xm: number =  xx + (e*i*w);
      xx = xm
      e *= -1;
      let x: number = i * w;
      let h: number = p.map(s[i], 0, 255, 0, p.height/(k*2));
      //p.fill(ColorUtil.random(ColorUtil.glitch));
      //p.rect(x, p.height - h, w,  h);
      p.rect(xm, p.height - h, w,  h);
      //p.rect(x + p.width / 2, p.height / 2 - h / 2, w, h);
    }
    //p.blendMode(p.BLEND);
  }

  static draw3d(p: p5, spectrum: number[], color: string, stroke: number): void {
    let s: number[] = [];
    let j: number = 0;
    let k: number = 1;
    for (let i: number = 0; i < spectrum.length; i+=k) {
      let n: number = 0;
      for (let l: number = 0; l < k; l++) {
        n += spectrum[i + l];
      }
      s[j++] = n
    }

    let w: number = p.width / s.length;
    //p.blendMode(p.DIFFERENCE);
    let e: number = 1;
    let xx: number = 0;
    p.stroke(color);
    p.strokeWeight(stroke);
    let hh = p.height/2;
    p.noFill()
    for (let i = 0; i < s.length; i++) {
      //let x = i * w - p.width / 2;
      let xm: number =  xx + (e*i*w);
      xx = xm
      e *= -1;
      let x: number = i * w;
      let h: number = p.map(s[i], 0, 255, 0, hh/(k));
      //p.fill(ColorUtil.random(ColorUtil.glitch));
      //p.fill(color);
      //p.rect(x, p.height - h, w,  h);
      p.rect(xm, hh - h, w,  h);
    }
    //p.blendMode(p.BLEND);
  }
}

export default Sprectrum;