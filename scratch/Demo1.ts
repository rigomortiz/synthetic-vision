// @ts-ignore
import Hydra from "hydra-synth";

const Demo = (hydra: Hydra) => {
  hydra.setFunction({
    name: 'chroma',
    type: 'color',
    inputs: [],
    glsl: `
               float maxrb = max( _c0.r, _c0.b );
               float k = clamp( (_c0.g-maxrb)*5.0, 0.0, 1.0 );
               float dg = _c0.g; 
               _c0.g = min( _c0.g, maxrb*0.8 ); 
               _c0 += vec4(dg - _c0.g);
               return vec4(_c0.rgb, 1.0 - k);
            `
  })

  hydra.setFunction({
    name: 'gradient2',
    type: 'src',
    inputs: [
      {
        type: 'float',
        name: 'speed',
        default: 0,
      }
    ],
    glsl:
      `return vec4(sin(time*speed), _st, 1.0);`
  })

  hydra.setFunction({
    name: 'negate',
    type: 'combine',
    inputs: [
      { type: 'float', name: 'amount', default: 1 }
    ],
    glsl:`
        _c1 *= amount;
        return vec4(vec3(1.0)-abs(vec3(1.0)-_c0.rgb-_c1.rgb), min(max(_c0.a, _c1.a),1.0));
    `
  })

  // Example Hydra code
  hydra.osc(60, 0.1, 1.5).chroma().out(hydra.o0)

  hydra.osc().rotate().out()

  hydra.gradient2(1).out()

  hydra.osc().negate(hydra.noise().brightness(.5)).out()
}

export default Demo;