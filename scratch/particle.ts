// this class describes the properties of a single particle.
import * as p5 from "p5"
import {MatrixColors} from "../src/enums/Colors";

const particleP5 = (p: p5) => {

    class Particle {
        x = p.random(0, window.innerWidth);
        y = p.random(0, window.innerHeight);
        r = p.random(1, 10);
        xSpeed = p.random(-2, 2);
        ySpeed = p.random(-1, 1.5);

        colors = [
            //Matrix.Green_1,
            //Matrix.Green_2,
            //Matrix.Green_3,
            MatrixColors.Green_4
        ];

        // setting the co-ordinates, radius and the
        // speed of a particle in both the co-ordinates axes.
        Particle() {

        }

        // creation of a particle.
        createParticle() {
            p.noStroke();
            p.fill(p.random(this.colors));
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
        p.textFont(font);
        p.textSize(fontsize);
        p.textAlign(p.CENTER, p.CENTER)
        for (let i = 0; i < window.innerWidth / 5; i++) {
            particles.push(new Particle());
        }
    }

    p.draw = () => {
        p.background(MatrixColors.Black);
        // Align the text in the center
        // and run drawWords() in the middle of the canvas
        p.textAlign(p.CENTER);
        drawWords(p.width * 0.5);
        for (let i = 0; i < particles.length; i++) {
            particles[i].createParticle();
            particles[i].moveParticle();
            particles[i].joinParticles(particles.slice(i));
        }
    }

    function drawWords(x: any) {
        // The text() function needs three parameters:
        // the text to draw, the horizontal position,
        // and the vertical position
        p.fill('#FFFFFF');
        p.text('encrypted_node.py', x, p.height/2);
    }
}

export default particleP5;
