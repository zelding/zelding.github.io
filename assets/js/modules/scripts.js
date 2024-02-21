import {mod, div}                   from "./math.js";
import {C, Point, Size, Interval2D} from './types.js'

export const newColors = async (n = 16) => {
    return new Array(n)
        .fill(0)
        .map((_, i) => i === 0
            // black first
                       ? [0, 0, 0]
                       : [((1 << 8) * Math.random() | 0), ((1 << 8) * Math.random() | 0), ((1 << 8) * Math.random() | 0)]
        );
};

/**
 *
 * @param i :int
 * @param w :int
 * @returns {Point}
 */
export const data_to_canvas = (i, w) => {
    return new Point(
        mod(i, w),
        div(i, w)
    );
};

// @link https://math.stackexchange.com/questions/914823/shift-numbers-into-a-different-range
//                        |, [s.w, s.h] [i.w.s, i.w.e]
/**
 *
 * @param point :Point
 * @param size :Size
 * @param interval : Interval2D
 * @returns {C}
 */
export const data_in_boundary = (point, size, interval) => {
    if (interval.isBig()) {
        const re = interval.x.start.plus(
            interval.x.length().dividedBy(size.width).times(point.x)
        );
        const im = interval.y.start.plus(
            interval.y.length().dividedBy(size.height).times(point.y)
        );

        return new C(re, im.times(-1), true);
    }

    const re = point.x * (interval.x.length() / size.width ) + interval.x.start;
    const im = point.y * (interval.y.length() / size.height) + interval.y.start;

    return new C(re, -im, false);
};
