// pages/index.tsx
import React from 'react';
import '98.css';
import styles from '../../styles/Gallery.module.css';

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
        new Data("REC. 1.", "Stranger in the Q", "Opera"),
        new Data("REC. 2.", "Monokai", "Sin título"),
        new Data("REC. 3.", "Roni Kaufman", "Sin título"),
        new Data("REC. 4.", "Stranger in the Q", "Sin título"),
        new Data("REC. 5.", "P1xelboy", "Sin título"),
        new Data("REC. 6.", "Jonathan Barbeau", "Sin título"),
    ];
  const days: number[] = Array.from({ length: 6 }, (_: unknown, i: number): number => i);

    const handleClick: (num: number) => void = (num: number): void => {
        const url: string = "/live/genuary/jan-" + twoDigit(num);
        window.open(url,'_blank', 'popup=true, toolbar=false, menubar=false, scrollbars=false, resizable=yes, scrollbars=yes,' +
            ' fullscreen=yes, location=false, titlebar=false, status=false, top=0, left=0');
    };

  return (
    <div className={styles.gallery} key="gallery-genuary-2025">
      {days.map((index: number): JSX.Element => (
          <div className={styles.day} id={"rec-" + twoDigit(index + 1)} key={index}>
            <p><b>{data[index].title}</b></p>
              <img
                key={index}
                src={"/img/ciudad-sin-recuerdos/foto.png"}
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
          <div className="title-bar-text">Recuerdos</div>
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