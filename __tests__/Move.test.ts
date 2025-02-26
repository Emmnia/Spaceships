import { Vector, Move, Movable } from "..";

describe('Move', () => {
    test('should move object from (12, 5) to (5, 8) with velocity (-7, 3)', () => {
        const movable: Movable = {
            getPosition: jest.fn().mockReturnValue(new Vector(12, 5)),
            getVelocity: jest.fn().mockReturnValue(new Vector(-7, 3)),
            setPosition: jest.fn()
        };

        const move = new Move(movable);
        move.execute();

        expect(movable.setPosition).toHaveBeenCalledWith(new Vector(5, 8));
        expect(movable.getPosition).toHaveBeenCalledTimes(1);
        expect(movable.getVelocity).toHaveBeenCalledTimes(1);
    });

    test('should throw error when velocity cannot be read', () => {
        const movable: Movable = {
            getPosition: jest.fn().mockReturnValue(new Vector(0, 0)),
            getVelocity: jest.fn().mockImplementation(() => {
                throw new Error('Cannot read velocity');
            }),
            setPosition: jest.fn()
        };

        const move = new Move(movable);
        expect(() => move.execute()).toThrow('Cannot read velocity');
    });

    test('should throw error when position cannot be set', () => {
        const movable: Movable = {
            getPosition: jest.fn().mockReturnValue(new Vector(0, 0)),
            getVelocity: jest.fn().mockReturnValue(new Vector(1, 1)),
            setPosition: jest.fn().mockImplementation(() => {
                throw new Error('Cannot set position');
            })
        };

        const move = new Move(movable);
        expect(() => move.execute()).toThrow('Cannot set position');
    });
});