import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ChartsStateService } from '../../shared/store/charts/charts-state.service';
import { ButtonComponent } from '../../shared/components/controls/button/button.component';
import { AccordionComponent } from '../../shared/components/common/accordion/accordion.component';
import { CodeSnippetComponent } from '../../shared/components/common/code-snippet/code-snippet.component';
import { ChartConfigurationComponent } from '../../shared/components/common/chart-configuration/chart-configuration.component';

@Component({
  selector: 'ui-charts',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonComponent,
    RouterLink,
    AccordionComponent,
    CodeSnippetComponent,
    ChartConfigurationComponent,
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
      data: undefined,
      config: undefined,
      configTemplate: undefined,
      code: undefined,
      constants: {
        margin: { top: 40, right: 30, bottom: 40, left: 60 },
      },
    });
  }

  ngOnDestroy(): void {
    this.chartsStateService.destroy();
  }
}
