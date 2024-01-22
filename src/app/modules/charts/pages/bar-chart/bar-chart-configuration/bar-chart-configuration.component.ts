import { Component, Signal, TemplateRef } from '@angular/core';
import { BarChartStateService } from '../../../../../shared/store/charts/bar-chart/bar-chart-state.service';
import { NgTemplateOutlet } from '@angular/common';
import { BarChartConfigMarginComponent } from './bar-chart-config-margin/bar-chart-config-margin.component';
import { BarChartConfigDataComponent } from './bar-chart-config-data/bar-chart-config-data.component';

@Component({
  selector: 'sh-chart-configuration',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    BarChartConfigMarginComponent,
    BarChartConfigDataComponent,
  ],
  templateUrl: './bar-chart-configuration.component.html',
  styleUrl: './bar-chart-configuration.component.scss',
})
export class BarChartConfigurationComponent {
  protected configuration = this.barChartStateService.select('configuration');

  constructor(private barChartStateService: BarChartStateService) {}
}
