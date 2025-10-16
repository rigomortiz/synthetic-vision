// pages/index.tsx
import React from 'react';
import '98.css';
import styles from '../../../styles/Gallery.module.css';

class Data {
  title: string;
  credit: string;
  description: string;

  constructor(title: string, credit: string, description: string) {
    this.title = title;
    this.credit = credit;
    this.description = description;
  }
}

const Gallery: React.FC = (): JSX.Element => {
  function twoDigit(num: number): string {
    return num.toString().padStart(2, '0');
  }
  const data: Data[] = [
        new Data("JAN. 1.", "Stranger in the Q", "Vertical or horizontal lines only."),
        new Data("JAN. 2.", "Monokai", "Layers upon layers upon layers."),
        new Data("JAN. 3.", "Roni Kaufman", "Exactly 42 lines of code."),
        new Data("JAN. 4.", "Stranger in the Q", "Black on black."),
        new Data("JAN. 5.", "P1xelboy", "Isometric Art (No vanishing points)."),
        new Data("JAN. 6.", "Jonathan Barbeau", "Make a landscape using only primitive shapes."),
        new Data("JAN. 7.", "Camille Roux", "Use software that is not intended to create art or images."),
        new Data("JAN. 8.", "Piter Pasma", "Draw one million of something."),
        new Data("JAN. 9.", "Piter Pasma", "The textile design patterns of public transport seating."),
        new Data("JAN. 10.", "Darien Brito", "You can only use TAU in your code, no other number allowed."),
        new Data("JAN. 11.", "Rachel Ehrlich (Joy of Randomness) and the Recurse Center", "Impossible day"),
        new Data("JAN. 12.", "Melissa Wiederrecht", "Subdivision."),
        new Data("JAN. 13.", "Heeey", "Triangles and nothing else."),
        new Data("JAN. 14.", "Melissa Wiederrecht", "Pure black and white. No gray."),
        new Data("JAN. 15.", "Melissa Wiederrecht", "Design a rug."),
        new Data("JAN. 16.", "Stranger in the Q", "Generative palette."),
        new Data("JAN. 17.", "Roni Kaufman", "What happens if pi=4?"),
        new Data("JAN. 18.", "Melissa Wiederrecht", "What does wind look like?"),
        new Data("JAN. 19.", "Melissa Wiederrecht", "Op Art."),
        new Data("JAN. 20.", "Melissa Wiederrecht", "Generative Architecture."),
        new Data("JAN. 21.", "Darien Brito", "Create a collision detection system (no libraries allowed)."),
        new Data("JAN. 22.", "Melissa Wiederrecht", "Gradients only."),
        new Data("JAN. 23.", "Melissa Wiederrecht and Roni Kaufman", "Inspired by brutalism."),
        new Data("JAN. 24.", "Bruce Holmer", "Geometric art - pick either a circle, rectangle, or triangle and use only that geometric shape."),
        new Data("JAN. 25.", "Bruce Holmer, Chris Barber (code_rgb), Heeey, Monokai", "One line that may or may not intersect itself"),
        new Data("JAN. 26.", "Melissa Wiederrecht", "Symmetry."),
        new Data("JAN. 27.", "Melissa Wiederrecht", "Make something interesting with no randomness or noise or trig."),
        new Data("JAN. 28.", "Sophia (fractal kitty)", "Infinite Scroll."),
        new Data("JAN. 29.", "Melissa Wiederrecht", "Grid-based graphic design."),
        new Data("JAN. 30.", "Melissa Wiederrecht", "Abstract map."),
        new Data("JAN. 31.", "Melissa Wiederrecht", "Pixel sorting."),
    ];
  const days: number[] = Array.from({ length: 14 }, (_: unknown, i: number): number => i);

    const handleClick: (num: number) => void = (num: number): void => {
        const url: string = "/live/genuary/jan-" + twoDigit(num);
        window.open(url,'_blank', 'popup=true, toolbar=false, menubar=false, scrollbars=false, resizable=yes, scrollbars=yes,' +
            ' fullscreen=yes, location=false, titlebar=false, status=false, top=0, left=0');
    };

  return (
    <div className={styles.gallery} key="gallery-genuary-2025">
      {days.map((index: number): JSX.Element => (
          <div className={styles.day} id={"day-" + twoDigit(index + 1)} key={index}>
            <p><b>{data[index].title}</b></p>
              <img
                key={index}
                src={"/gif/jan-" + twoDigit(index + 1) + ".gif"}
                alt={`GIF ${index + 1}`}
                className={styles.gif}
                onClick={(): void => handleClick(index + 1)}
              />
          <p>{data[index].description}</p>
          </div>
      ))}
    </div>
  );
};

const Page: React.FC = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.window}>
        <div className="title-bar">
          <div className="title-bar-text">Genuary 2025</div>
          <div className="title-bar-controls">
            <button aria-label="Minimize" />
            <button aria-label="Maximize" />
            <button aria-label="Close" />
          </div>
        </div>
        <div className="window-body">
          <Gallery />
        </div>
      </div>
    </div>
  );
};

export default Page;