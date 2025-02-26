import { Vector } from '..';

describe('Vector', () => {
    test('should correctly add two vectors', () => {
        const v1 = new Vector(1, 2);
        const v2 = new Vector(3, 4);
        const result = Vector.plus(v1, v2);
        expect(result.x).toBe(4);
        expect(result.y).toBe(6);
    });

    test('should correctly rotate vector', () => {
        const v = new Vector(1, 0);
        const result = Vector.rotate(v, Math.PI / 2);
        expect(result.x).toBeCloseTo(0);
        expect(result.y).toBeCloseTo(1);
    });
});