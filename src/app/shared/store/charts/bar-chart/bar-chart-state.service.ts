import { Injectable, TemplateRef } from '@angular/core';
import { SignalsStoreService } from '../../signals-store.service';
import { Subject } from 'rxjs';
import * as d3 from 'd3';

interface ChartSize {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  width: number;
  height: number;
}

export interface BarChartState {
  currentChart: string;
  code: TemplateRef<any>;
  data: any;
  configuration: {
    margin?: { top: number; right: number; bottom: number; left: number };
    xAxisProperty?: string;
    yAxisProperty?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class BarChartStateService extends SignalsStoreService<BarChartState> {
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
      (this.state().configuration.margin?.left ?? 0) -
      (this.state().configuration.margin?.right ?? 0);

    const contentHeight =
      element.offsetHeight -
      (this.state().configuration.margin?.top ?? 0) -
      (this.state().configuration.margin?.bottom ?? 0);

    return { svg: svg, width: contentWidth, height: contentHeight };
  }
}
