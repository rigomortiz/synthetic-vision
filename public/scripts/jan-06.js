(p, h, sv) => {
    p.draw = () => {
        p.clear();
        p.background(0, 0, 0, 150);
        p.orbitControl();
        sv.drawText(p, sv.text, 0, 0);
        p.rotateY(p.millis() * 0.01);
        p.rotateX(p.millis() * 0.01)
        p.rotateZ(p.millis() * 0.01)
        sv.drawCube(p, 0, 0, 0, sv.cubeSize, sv.COLORS.RED);
        sv.drawPlanet(p, 0, 0, 0, sv.planetSize);
        sv.drawOrbite(p, 0, 0, 0, sv.ellipseWidth, sv.ellipseHeight, sv.COLORS.ELECTRIC_BLUE);
        sv.drawSatelliteInOrbite(p, sv.angle, sv.semiMinorAxis, sv.semiMajorAxis, sv.satelliteSize, sv.COLORS.NEON_PINK)
        p.stroke(sv.COLORS.NEON_GREEN)
        sv.calculateAngle()
    };

    h
        .src(h.s0)//.osc(2, 100, 0.5)
        //.modulate(h.noise(0.3), 0.5)
        .add(h.src(h.o0).scale(() =>
            p.sin(h.time) + 2 * p.cos(h.time) + 5 * p.sin(h.time) + 10 * p.cos(h.time)), .5)
        .diff(h.src(h.o0).scale(10))
        .diff(h.osc(1000, 20, 1.5).scale(10))
        //.modulateScale(h.noise(1000), .01)
        //.modulate(h.noise(3), 0.5)
        .out()

    h.render(h.o0);

}