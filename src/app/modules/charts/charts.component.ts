import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../../shared/components/controls/button/button.component';
import { AccordionComponent } from '../../shared/components/common/accordion/accordion.component';
import { CodeSnippetComponent } from './pages/bar-chart/code-snippet/code-snippet.component';
import { BarChartConfigurationComponent } from './pages/bar-chart/bar-chart-configuration/bar-chart-configuration.component';
import { ChartsStateService } from '../../shared/store/charts/charts-state.service';

@Component({
  selector: 'ui-charts',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonComponent,
    RouterLink,
    AccordionComponent,
    CodeSnippetComponent,
    BarChartConfigurationComponent,
  ],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent implements OnInit, OnDestroy {
  protected readonly currentChart =
    this.chartsStateService.select('currentChart');

  constructor(private chartsStateService: ChartsStateService) {}

  ngOnInit(): void {
    this.chartsStateService.setState({
      currentChart: '',
    });
  }

  ngOnDestroy(): void {
    this.chartsStateService.destroy();
  }
}
