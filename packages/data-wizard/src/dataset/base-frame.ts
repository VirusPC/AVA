import * as utils from '../utils';
import type { SeriesData, FrameData, Axis, Extra } from './types';
import { isLegalBasicType, genArrIdx } from './utils';

type NDArray = any[] | any[][];

/** Base data structure */
export default abstract class BaseFrame {
  axes: [Axis[]] | [Axis[], Axis[]];

  data: NDArray;

  colData: NDArray;

  constructor(data: SeriesData | FrameData, extra?: Extra) {
    this.data = [];
    this.colData = [];
    this.axes = [[]];

    // 1D: object
    if (utils.isArray(data) && isLegalBasicType(data?.[0])) {
      // 1D: array
      this.data = data;
      this.colData = this.data;
    }

    if (utils.isArray(data)) {
      this.setAxis(0, genArrIdx(data, extra));
    }
  }

  /** get value functions */

  /**
   * Get data by row location and column location.
   * @param rowLoc
   * @param colLoc
   */
  abstract get(rowLoc: Axis | Axis[] | string, colLoc?: Axis | Axis[] | string): BaseFrame;

  /**
   * Get data by row location and column location using integer-index.
   * @param rowLoc
   * @param colLoc
   */
  abstract getByIntIndex(rowLoc: number | number[] | string, colLoc?: number | number[] | string): BaseFrame;

  get shape(): [number] | [number, number] {
    return [this.axes[0].length, this.axes[1].length];
  }

  get index(): Axis[] {
    return this.getAxis(0);
  }

  get columns(): Axis[] {
    return this.getAxis(1);
  }

  private getAxis(axis: number) {
    return this.axes[axis];
  }

  /**
   * Set axis. Only the 0 and 1 are currently supported.
   * @param axis
   * @param labels
   */
  setAxis(axis: number, labels: Axis[]) {
    this.axes[axis] = labels;
  }
}
