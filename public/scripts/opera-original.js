(p, h, sv) => {
    sv.videos[0].play()
    if (!sv.sound.isPlaying()) {
        sv.sound.play();
    }
    sv.hide()
    p.draw = () => {
        //sv.shader.setUniform('u_mouse', [.5, .5]);
        p.push();
        p.imageMode(p.CENTER);
        p.image(sv.videos[0],
            0, 0, p.width, p.height,
            0, 0, sv.videos[0].width, sv.videos[0].height,
            p.COVER
        );
        p.filter(sv.shader);
        p.translate(0, 0, 0);
        p.textFont(sv.font("Volunmo"));
        p.textAlign(p.CENTER);
        p.textSize(300);
        p.fill(255);
        p.text("ÓPERA", 0,0);
        p.textSize(46);
        p.textFont(sv.font("Terminus"));
        p.text("Sinfonía audiovisual",0,-300);
        p.textSize(32);
        p.text("@bad_request & @rigomortiz" ,0,300);

        p.noFill();
        p.stroke(255, 0, 0); // Color rojo
        p.strokeWeight(4);
        p.rect(-p.width/2, -p.height/2, 0, p.width/2, p.height/2, 0); // Marco con margen
        p.fill(255, 0, 0); // Color rojo
        p.noStroke();
        p.textFont(sv.font("Terminus"));
        p.textSize(32);
        p.textAlign(p.LEFT, p.TOP);
        p.text("REC", 20, 20); // Posición en la esquina superior izquierda

        // Mostrar el tiempo del video
        const videoTime = sv.videos[0].time().toFixed(2); // Tiempo del video con 2 decimales
        p.textSize(24);
        p.text(`Tiempo: ${videoTime}s`, 20, 60); // Posición debajo de "REC"
        if(videoTime > 5) {
            p.textSize(24);
            p.text("¡Ya puedes empezar a grabar!", 20, 100); // Mensaje de inicio
            let button = p.createButton('click me', 'red');
            button.position(0,0, 0);
        }

    };
    //  h.s0.init({src: sv.videos[0].elt});

    h.src(h.s0)
        //.modulate(h.noise(sv.amplitude.getLevel() * sv.fft.waveform()[0]),
        //         sv.fft.waveform()[0])
        .add(h.src(h.o0).scale(()=> p.sin(sv.videos[0].time())), -33.3)
        .add(h.src(h.o0).scale(()=> p.cos(h.time/sv.videos[0].time())), .5)
        .modulateScale(h.noise(sv.fft.waveform()[0]), sv.amplitude.getLevel())
        .mult(
            h.src(h.s0).color(1, 0,sv.fft.waveform()[0]).scale(sv.amplitude.getLevel()*20),
            sv.fft.waveform()[0])
        .out()

    h.render(h.o0);
}