import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Signal,
  TemplateRef,
  ViewChild,
  effect,
} from '@angular/core';
import { ChartsStateService } from '../../../../shared/store/charts/charts-state.service';
import { ChartCardComponent } from '../../../../shared/components/common/chart-card/chart-card.component';
import * as d3 from 'd3';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
} from 'rxjs';
import { BarChartMockData } from '../../../../shared/mocks/raw/charts/bar-chart.data';
import { ChartConfigMarginComponent } from '../../../../shared/components/common/chart-configuration/chart-config-margin/chart-config-margin.component';

@Component({
  selector: 'bar-chart',
  standalone: true,
  imports: [ChartCardComponent],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent implements OnInit, OnDestroy {
  @ViewChild('barChart', { static: true }) private chartContainer!: ElementRef;
  @ViewChild('barChartCode', { static: true })
  private chartCode!: TemplateRef<any>;

  protected data = this.chartsStateService.select('data') as Signal<any[]>;
  protected constants = this.chartsStateService.select('constants');

  private _subscriptions = new Subscription();

  constructor(private chartsStateService: ChartsStateService) {
    effect((): void => {
      this.createChart();
    });
  }

  ngOnInit() {
    this.chartsStateService.setState({
      currentChart: 'Bar Chart',
      code: this.chartCode,
      data: BarChartMockData,
    });

    this.createChart();
    this._subscriptions.add(
      fromEvent(window, 'resize')
        .pipe(debounceTime(300), distinctUntilChanged())
        .subscribe((): void => {
          this.createChart();
        })
    );
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  private createChart(): void {
    d3.select('svg').remove();

    const element = this.chartContainer.nativeElement;
    const data = this.data();
    const constants = this.constants();

    const {
      svg: svg,
      width: contentWidth,
      height: contentHeight,
    } = this.chartsStateService.getChartSize(element);

    ////////////////////////////////////////////////////////////////

    const x = d3
      .scaleBand()
      .rangeRound([0, contentWidth])
      .padding(0.1)
      .domain(data.map((d) => d.letter));

    const y = d3
      .scaleLinear()
      .rangeRound([contentHeight, 0])
      .domain([
        0,
        d3.max(
          data.filter((d) => d.frequency !== undefined),
          (d) => d.frequency
        ) as number,
      ]);

    const g = svg
      .append('g')
      .attr(
        'transform',
        'translate(' + constants.margin.left + ',' + constants.margin.top + ')'
      );

    g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + contentHeight + ')')
      .call(d3.axisBottom(x));

    g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(y).ticks(10, '%'))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.letter) as string | number)
      .attr('y', (d) => y(d.frequency))
      .attr('width', x.bandwidth())
      .attr('height', (d) => contentHeight - y(d.frequency));
  }
}
