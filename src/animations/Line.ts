class Line {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    color: string;

    constructor(x1: number, y1: number, x2: number, y2: number, color: string) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
    }
}

export default Line;