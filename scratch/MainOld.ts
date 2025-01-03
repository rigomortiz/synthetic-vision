import * as p5 from "p5";
import * as Tone from "tone";
import {BladeRunnerColors, MatrixColors, TechnoColors} from "../src/enums/Colors";

const Main = (p: p5) => {
    let fontTiny5: p5.Font;
    let fontTerminus: p5.Font;
    let fontTypeWrite: p5.Font;
    let fontVolunmo: p5.Font;
    let selectedTextIndex = 0;
    let metaverseLines: MetaverseLine[] = [];


    const additionalTexts = [
        "> 0000 __init__\n> 0001 Nodo encriptado\n> 0010 Bifurcación\n> 0011 Latin City\n> 0101 IA Iluminada\n> 0110 Tripas de Cyborg\n> 0111 Nirvana X\n> 1000 __del__"
    ];

    const menu = [
        "0000          __init__",
        "0001   Nodo encriptado",
        "0010       Bifurcación",
        "0011        Latin City",
        "0101      IA Iluminada",
        "0110  Tripas de Cyborg",
        "0111         Nirvana X",
        "1000           __del__"
    ];

    p.preload = () => {
        fontTerminus = p.loadFont('/fonts/terminus/TerminusTTF-4.49.2.ttf');
        fontTiny5 = p.loadFont('/fonts/tiny5/Tiny5-Regular.ttf');
        fontTypeWrite = p.loadFont('/fonts/type-writer/type_writer.ttf');
        fontVolunmo = p.loadFont('/fonts/volunmo/volunmo.ttf');
        console.log("IntroSV preload");
    };

    p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.background(MatrixColors.Black);
        setupMetaverseLines(p);
        //startArcadeMelody();
        //startTechnoIndustrialSound();
    };

    p.draw = () => {
        p.background(MatrixColors.Black);
        drawTerminalBackground(20, 1.5);
        drawMetaverseLines(p);
        drawTitle();
        drawSubtitle();
        drawMenu();
        drawButtonInsertBitcoin();
        drawCyberpunkCursor(p);
    };

    p.keyPressed = () => {
        if (p.keyCode === p.ENTER) {
            Tone.Transport.start();
            // p.remove();
            // p.createCanvas(window.innerWidth, window.innerHeight);
            // p.background(Matrix.Black);
            // p.preload();
            // p.textFont(fontTypeWrite);
            // p.textAlign(p.CENTER);
            // p.textSize(64);
            // p.fill(CyberpunkSynthWave.PinkBite);
            // p.text("Loading...", p.width / 2, p.height / 2);
        } else if (p.keyCode === p.UP_ARROW) {
            selectedTextIndex = (selectedTextIndex > 0) ? selectedTextIndex - 1 : menu.length - 1;
            playShortCircuitSound();
        } else if (p.keyCode === p.DOWN_ARROW) {
            selectedTextIndex = (selectedTextIndex < menu.length - 1) ? selectedTextIndex + 1 : 0;
            playShortCircuitSound();
        }
    };

    p.mousePressed = () => {
    }

    function createTVStaticEffect(p: p5, x: number, y: number) {
        const staticSize = 50;
        for (let i = 0; i < staticSize; i++) {
            for (let j = 0; j < staticSize; j++) {
                p.stroke(p.random(255));
                p.point(x + i - staticSize / 2, y + j - staticSize / 2);
            }
        }
    }

    function startTechnoIndustrialSound() {
        const synth = new Tone.Synth({
            oscillator: {
                type: "sawtooth"
            },
            envelope: {
                attack: 0.01,
                decay: 0.2,
                sustain: 0.5,
                release: 1
            }
        }).toDestination();

        const filter = new Tone.Filter({
            type: "lowpass",
            frequency: 800,
            rolloff: -24,
            Q: 15
        }).toDestination();

        synth.connect(filter);

        const notes = ["E2", "G2", "A2", "B2", "D3", "E3", "G3", "A3", "B3", "D4", "E4", "G4", "A4", "B4", "D5", "E5"];
        const melody = new Tone.Sequence(
            (time, note) => {
                synth.triggerAttackRelease(note, "8n", time);
            },
            notes,
            "4n"
        );

        Tone.Transport.bpm.value = 190; // Set the tempo
        melody.start(0);
        Tone.Transport.start();
        Tone.Transport.start();
    }

    function playShortCircuitSound() {
        const noise = new Tone.Noise("white").start();
        const filter = new Tone.Filter(800, "highpass").toDestination();
        const envelope = new Tone.AmplitudeEnvelope({
            attack: 0.01,
            decay: 0.1,
            sustain: 0,
            release: 0.1
        }).toDestination();

        noise.connect(filter);
        filter.connect(envelope);
        envelope.triggerAttackRelease(0.1);

        setTimeout(() => {
            noise.dispose();
            filter.dispose();
            envelope.dispose();
        }, 100);
    }

    function startArcadeMelody() {
        const synth = new Tone.Synth().toDestination();
        const melody = new Tone.Sequence(
            (time, note) => {
                synth.triggerAttackRelease(note, "8n", time);
            },
            ["C4", "E4", "G4", "B4", "C5", "B4", "G4", "E4"],
            "4n"
        );

        Tone.Transport.bpm.value = 120;
        melody.start(0);
    }

    function drawTerminalBackground(size: number = 10, blur: number = 2) {
        p.stroke(MatrixColors.Green_1);
        p.strokeWeight(1);
        for (let i = 0; i <= p.width; i += size) {
            p.line(i, 0, i, p.height);
        }
        for (let j = 0; j <= p.height; j += size) {
            p.line(0, j, p.width, j);
        }
        p.filter(p.BLUR, blur);
    }

    function drawMenu() {
        p.textAlign(p.CENTER);
        p.textFont(fontTerminus);
        p.textSize(32);
        menu.forEach((text, index) => {
            if (index === selectedTextIndex) {
                text = `> ${text}`;
            }
            p.fill(MatrixColors.Green_4);
            p.text(text, p.width / 2, p.height / 3 + index * 40);

            // Blade Runner effect
            if (index === selectedTextIndex) {
                for (let i = 0; i < 5; i++) {
                    let offsetX = p.random(-2, 2);
                    let offsetY = p.random(-2, 2);
                    p.fill(TechnoColors.HotPink);
                    p.text(text, p.width / 2 + offsetX, p.height / 3 + index * 40 + offsetY);
                }

                // Glitch effect
                for (let i = 0; i < 3; i++) {
                    let glitchOffsetX = p.random(-5, 5);
                    let glitchOffsetY = p.random(-5, 5);
                    p.fill(p.random([TechnoColors.LaserRed, TechnoColors.ElectricBlue, TechnoColors.UltraViolet]));
                    p.text(text, p.width / 2 + glitchOffsetX, p.height / 3 + index * 40 + glitchOffsetY);
                }
            }
        });
    }

    function drawTitle() {
        p.textAlign(p.CENTER);
        p.fill(BladeRunnerColors.CyberYellow);
        p.textFont(fontTiny5);
        p.textSize(120);
        p.blendMode(p.ADD);
        for (let i = 0; i < 10; i++) {
            p.fill(255, 222, 89, 110 / (i + 1));
            p.text('RETURN VOID', p.width / 2, p.height / 8);
        }
        p.blendMode(p.BLEND);
        p.filter(p.BLUR, 1);
        applyGlitchEffect(p.width / 2, p.height / 8);
    }

    function drawSubtitle() {
        p.textAlign(p.CENTER);
        p.fill(BladeRunnerColors.HologramWhite);
        p.textFont(fontVolunmo);
        p.textSize(30);
        p.text('By Bad Request & Rigomortiz', p.width / 2, p.height / 3 - 50);
    }


    function applyGlitchEffect(x: number, y: number) {
        p.textFont(fontTiny5);
        p.textSize(120);
        p.textAlign(p.CENTER);
        for (let i = 0; i < 5; i++) {
            let offsetX = p.random(-10, 10);
            let offsetY = p.random(-10, 10);
            let colorsBladeRunner = [
                BladeRunnerColors.CyberYellow, BladeRunnerColors.NeonRed, BladeRunnerColors.ElectricBlue,
                BladeRunnerColors.DeepPurple, BladeRunnerColors.NeonGreen];
            p.fill(colorsBladeRunner[Math.floor(Math.random() * colorsBladeRunner.length)]);
            p.text('RETURN VOID', x + offsetX, y + offsetY);
        }
    }

    function drawTypingText(text: string, x: number, y: number, index: number) {
        const charIndex = Math.floor((p.frameCount - index * 20000));
        const displayedText = text.substring(0, charIndex);
        p.textAlign(p.LEFT);
        p.fill(TechnoColors.VirtualCyan);
        p.text(displayedText, x - 200, y);

    }

    function drawButtonInsertBitcoin() {
        const heightMenu = p.height / 3 + 320;

        const buttonVisible = Math.floor(p.frameCount / 10) % 2 === 0;

        if (buttonVisible) {
            p.fill(TechnoColors.CyberYellow);
            p.stroke(TechnoColors.LaserRed);
            p.strokeWeight(4);
            p.rect(p.width / 2 - 100, heightMenu + 5, 200, 50, 10);

            p.textAlign(p.CENTER, p.CENTER);
            p.strokeWeight(1)
            p.fill(TechnoColors.MatrixBlack);
            p.textSize(20);
            p.text("Insert Bitcoin", p.width / 2, heightMenu + 30);
        }
    }

    function drawCyberpunkCursor(p: p5) {
        const cursorSize = 30;
        p.noCursor(); // Hide the default cursor

        p.stroke(TechnoColors.LaserRed)
        p.strokeWeight(1);
        p.line(0, p.mouseY, p.width, p.mouseY);
        p.line(p.mouseX, 0, p.mouseX, p.height);

        // Draw outer circle
        p.stroke(TechnoColors.LaserRed);
        p.strokeWeight(2);
        p.noFill();
        p.ellipse(p.mouseX, p.mouseY, cursorSize);

        // Draw inner circle
        p.fill(0);
        p.noStroke();
        p.ellipse(p.mouseX, p.mouseY, cursorSize);

        // Draw crosshair lines
        p.stroke(TechnoColors.UltraViolet);
        p.strokeWeight(1);
        p.line(p.mouseX - cursorSize / 2, p.mouseY, p.mouseX + cursorSize / 2, p.mouseY);
        p.line(p.mouseX, p.mouseY - cursorSize / 2, p.mouseX, p.mouseY + cursorSize / 2);

        /*if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
            p.blendMode(p.BLEND);

            p.blendMode(p.BLEND);
            p.filter(p.BLUR, 3);

            p.fill(Matrix.Green_4);
            p.rect(p.mouseX - 15, p.mouseY - 15, 30, 30);
        }*/
    }

    class MetaverseLine {
        x: number;
        y: number;
        speed: number;
        length: number;
        color: string;

        constructor(x: number, y: number, speed: number, length: number, color: string) {
            this.x = x;
            this.y = y;
            this.speed = speed;
            this.length = length;
            this.color = color;
        }

        update() {
            this.y += this.speed;
            if (this.y > window.innerHeight) {
                this.y = -this.length;
            }
        }

        draw(p: p5) {
            p.stroke(this.color);
            p.line(this.x, this.y, this.x, this.y + this.length);
        }
    }


    function setupMetaverseLines(p: p5, numLines: number = 200) {
        for (let i = 0; i < numLines; i++) {
            let x = p.random(p.width);
            let y = p.random(p.height);
            let speed = p.random(2, 5);
            let length = p.random(20, 50);
            let colorRandomMatrix = p.random([MatrixColors.Green_1, MatrixColors.Green_2, MatrixColors.Green_3, MatrixColors.Green_4]);
            metaverseLines.push(new MetaverseLine(x, y, speed, length, colorRandomMatrix));
        }
    }

    function drawMetaverseLines(p5: p5) {
        metaverseLines.forEach(line => {
            line.update();
            line.draw(p5);
        });
    }


    const emptyvision = (p: p5) => {
        p.setup = () => {
            p.createCanvas(window.innerWidth, window.innerHeight);
            p.background(0);
        };

        p.draw = () => {
            // Empty vision
        };
    };

};

export default Main;