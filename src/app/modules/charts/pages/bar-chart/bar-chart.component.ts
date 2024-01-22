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
import { BarChartStateService } from '../../../../shared/store/charts/bar-chart/bar-chart-state.service';
import { ChartCardComponent } from '../../../../shared/components/common/chart-card/chart-card.component';
import * as d3 from 'd3';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  fromEvent,
} from 'rxjs';
import { ChartsStateService } from '../../../../shared/store/charts/charts-state.service';
import { BarChartMockData } from '../../../../shared/mocks/raw/charts/bar-chart.data';

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

  protected data = this.barChartStateService.select('data') as Signal<any[]>;
  protected configuration = this.barChartStateService.select('configuration');

  private _subscriptions = new Subscription();

  constructor(
    private barChartStateService: BarChartStateService,
    private chartsStateService: ChartsStateService
  ) {
    effect((): void => {
      this.createChart();
    });
  }

  ngOnInit() {
    if (typeof document !== 'undefined') {
      document.title = 'D3Library | Bar Chart';
    }

    this.chartsStateService.setState({
      currentChart: 'Bar Chart',
    });

    this.barChartStateService.setState({
      code: this.chartCode,
      configuration: {
        margin: {
          top: 40,
          bottom: 40,
          left: 60,
          right: 30,
        },
        xAxisProperty: '',
        yAxisProperty: '',
      },
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
    const data = this.data() || BarChartMockData;
    const configuration = this.configuration();

    const {
      svg: svg,
      width: contentWidth,
      height: contentHeight,
    } = this.barChartStateService.getChartSize(element);

    ////////////////////////////////////////////////////////////////

    const xAxisProperty =
      this.barChartStateService.select('configuration')()?.xAxisProperty ||
      'letter';
    const yAxisProperty =
      this.barChartStateService.select('configuration')()?.yAxisProperty ||
      'frequency';

    if (
      xAxisProperty &&
      xAxisProperty !== '' &&
      yAxisProperty &&
      yAxisProperty !== ''
    ) {
      const x = d3
        .scaleBand()
        .rangeRound([0, contentWidth])
        .padding(0.1)
        .domain(data.map((d) => d[xAxisProperty]));

      const y = d3
        .scaleLinear()
        .rangeRound([contentHeight, 0])
        .domain([
          0,
          d3.max(
            data.filter((d) => d[yAxisProperty] !== undefined),
            (d) => d[yAxisProperty]
          ) as number,
        ]);

      const g = svg
        .append('g')
        .attr(
          'transform',
          'translate(' +
            (configuration.margin?.left || 0) +
            ',' +
            (configuration.margin?.top || 0) +
            ')'
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
        .attr('x', (d) => x(d[xAxisProperty]) as string | number)
        .attr('y', (d) => y(d[yAxisProperty]))
        .attr('width', x.bandwidth())
        .attr('height', (d) => contentHeight - y(d[yAxisProperty]));
    }
  }
}
