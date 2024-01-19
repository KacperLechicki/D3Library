import { Injectable } from '@angular/core';
import { SignalsStoreService } from '../signals-store.service';
import { Subject } from 'rxjs';
import * as d3 from 'd3';

interface ChartSize {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  width: number;
  height: number;
}

export interface ChartsState {
  currentChart: string;
  constants: {
    margin: { top: number; right: number; bottom: number; left: number };
  };
}

@Injectable({
  providedIn: 'root',
})
export class ChartsStateService extends SignalsStoreService<ChartsState> {
  private destroyed$ = new Subject<void>();

  public destroy(): void {
    this.destroyed$.next();
  }

  constructor() {
    super();
  }

  public getChartSize(element: HTMLElement): ChartSize {
    const svg = d3
      .select(element)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${element.offsetWidth} ${element.offsetHeight}`);

    const contentWidth =
      element.offsetWidth -
      this.state().constants.margin.left -
      this.state().constants.margin.right;

    const contentHeight =
      element.offsetHeight -
      this.state().constants.margin.top -
      this.state().constants.margin.bottom;

    return { svg: svg, width: contentWidth, height: contentHeight };
  }
}
