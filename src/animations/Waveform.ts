import p5 from "p5";

class Waveform {
  static draw2d(p:p5, waveform: number[], color: string, stroke: number): void {
    let w: number = p.width / waveform.length;
    p.beginShape();
    p.noFill();
    p.strokeWeight(stroke)
    p.stroke(color);
    for (let i = 0; i < waveform.length; i++) {
      let x = i * w;
      let y = p.map(waveform[i], -1, 1, p.height, 0);
      p.vertex(i * p.width / waveform.length, p.height * .5 + waveform[i] * 150)
      //p.vertex(x, y);
    }
    p.endShape();
  }

  static draw3d(p:p5, waveform: number[], color: string, stroke: number): void{
    let w: number = (p.width) / waveform.length;
    p.beginShape();
    p.noFill();
    p.strokeWeight(stroke)
    p.stroke(color);
    let x: number = -p.width / 2;
    for (let i = 0; i < waveform.length; i++) {
      let y = p.map(waveform[i], -1, 1, -p.height/2, p.height/2);
      //p.vertex(x + i * w, waveform[i] * 150, 0)
      p.vertex(x + i * w, y);
    }
    p.endShape();
  }
}

export default Waveform;