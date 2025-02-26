export class Vector {
    constructor(public x: number, public y: number) { }

    static plus(v1: Vector, v2: Vector): Vector {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }

    static rotate(vector: Vector, angle: number): Vector {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return new Vector(
            vector.x * cos - vector.y * sin,
            vector.x * sin + vector.y * cos
        );
    }
}

export interface Movable {
    getPosition(): Vector;
    getVelocity(): Vector;
    setPosition(newValue: Vector): void;
}

export class Move {
    private movable: Movable;

    constructor(m: Movable) {
        this.movable = m;
    }

    public execute(): void {
        const newPosition = Vector.plus(
            this.movable.getPosition(),
            this.movable.getVelocity()
        );
        this.movable.setPosition(newPosition);
    }
}

export interface Rotatable {
    getPosition(): Vector;
    getAngularVelocity(): number;
    getOrientation(): Vector;
    setOrientation(newValue: Vector): void;
}

export class Rotate {
    private rotatable: Rotatable;

    constructor(r: Rotatable) {
        this.rotatable = r;
    }

    public execute(deltaTime: number): void {
        const currentOrientation = this.rotatable.getOrientation();
        const angularVelocity = this.rotatable.getAngularVelocity();

        const rotationAngle = angularVelocity * deltaTime;

        const newOrientation = Vector.rotate(currentOrientation, rotationAngle);
        this.rotatable.setOrientation(newOrientation);
    }
}