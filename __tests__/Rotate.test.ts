import { Rotatable, Vector, Rotate } from "..";

describe('Rotate', () => {
    test('should rotate object orientation by 90 degrees', () => {
        const rotatable: Rotatable = {
            getPosition: jest.fn().mockReturnValue(new Vector(0, 0)),
            getAngularVelocity: jest.fn().mockReturnValue(Math.PI / 2),
            getOrientation: jest.fn().mockReturnValue(new Vector(1, 0)),
            setOrientation: jest.fn()
        };

        const rotate = new Rotate(rotatable);
        rotate.execute(1);

        expect(rotatable.setOrientation).toHaveBeenCalledWith(
            expect.objectContaining({
                x: expect.closeTo(0),
                y: expect.closeTo(1)
            })
        );
    });

    test('should throw error when orientation cannot be read', () => {
        const rotatable: Rotatable = {
            getPosition: jest.fn().mockReturnValue(new Vector(0, 0)),
            getAngularVelocity: jest.fn().mockReturnValue(1),
            getOrientation: jest.fn().mockImplementation(() => {
                throw new Error('Cannot read orientation');
            }),
            setOrientation: jest.fn()
        };

        const rotate = new Rotate(rotatable);
        expect(() => rotate.execute(1)).toThrow('Cannot read orientation');
    });

    test('should throw error when orientation cannot be set', () => {
        const rotatable: Rotatable = {
            getPosition: jest.fn().mockReturnValue(new Vector(0, 0)),
            getAngularVelocity: jest.fn().mockReturnValue(1),
            getOrientation: jest.fn().mockReturnValue(new Vector(1, 0)),
            setOrientation: jest.fn().mockImplementation(() => {
                throw new Error('Cannot set orientation');
            })
        };

        const rotate = new Rotate(rotatable);
        expect(() => rotate.execute(1)).toThrow('Cannot set orientation');
    });
});