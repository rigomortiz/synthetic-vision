import * as p5 from "p5";
import {TechnoColors} from "../enums/Colors";

class CyberPunkEffects {
  static cursor(p: p5) {
    const cursorSize = 30;
    p.noCursor(); // Hide the default cursor

    p.stroke(TechnoColors.LaserRed)
    p.line(-p.width, -p.mouseY, 0, p.width, p.mouseY, 0);
    p.line(-p.mouseX, -p.height, 0, p.mouseX, p.height, 0);

    // Draw outer circle
    p.stroke(TechnoColors.LaserRed);
    p.noFill();
    p.ellipse(p.mouseX, p.mouseY, cursorSize);

    // Draw inner circle
    p.fill(0);
    p.noStroke();
    p.ellipse(p.mouseX, p.mouseY, cursorSize);

    // Draw crosshair lines
    p.stroke(TechnoColors.UltraViolet);
    p.line(p.mouseX - cursorSize / 2, p.mouseY, 0, p.mouseX + cursorSize / 2, p.mouseY, 0);
    p.line(p.mouseX, p.mouseY - cursorSize / 2, 0, p.mouseX, p.mouseY + cursorSize / 2, 0);

    /*if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
        p.blendMode(p.BLEND);

        p.blendMode(p.BLEND);
        p.filter(p.BLUR, 3);

        p.fill(Matrix.Green_4);
        p.rect(p.mouseX - 15, p.mouseY - 15, 30, 30);
    }*/
  }

}

export default CyberPunkEffects;