import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ChartsStateService } from '../../shared/store/charts/charts-state.service';
import { ButtonComponent } from '../../shared/components/controls/button/button.component';
import { AccordionComponent } from '../../shared/components/common/accordion/accordion.component';
import { CodeSnippetComponent } from '../../shared/components/common/code-snippet/code-snippet.component';
import { BarChartStateService } from '../../shared/store/charts/bar-chart/bar-chart-state.service';

@Component({
  selector: 'ui-charts',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonComponent,
    RouterLink,
    AccordionComponent,
    CodeSnippetComponent,
  ],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent implements OnInit, OnDestroy {
  protected readonly currentChart =
    this.chartsStateService.select('currentChart');

  constructor(
    private chartsStateService: ChartsStateService,
    private barChartStateService: BarChartStateService
  ) {}

  ngOnInit(): void {
    this.chartsStateService.setState({
      currentChart: '',
      constants: {
        margin: { top: 40, right: 30, bottom: 40, left: 60 },
      },
    });
  }

  ngOnDestroy(): void {
    this.chartsStateService.destroy();
  }

  protected changeData(): void {
    this.barChartStateService.setState({
      data: [
        {
          field: 'a',
          value: 23,
        },
        {
          field: 'b',
          value: {
            value1: 1,
            value2: 2,
          },
        },
      ],
    });
  }
}
