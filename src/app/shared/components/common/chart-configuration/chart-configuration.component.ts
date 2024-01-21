import { Component, Signal, TemplateRef } from '@angular/core';
import { ChartsStateService } from '../../../store/charts/charts-state.service';
import { NgTemplateOutlet } from '@angular/common';
import { ChartConfigMarginComponent } from './chart-config-margin/chart-config-margin.component';

@Component({
  selector: 'sh-chart-configuration',
  standalone: true,
  imports: [NgTemplateOutlet, ChartConfigMarginComponent],
  templateUrl: './chart-configuration.component.html',
  styleUrl: './chart-configuration.component.scss',
})
export class ChartConfigurationComponent {
  protected configuration: Signal<TemplateRef<any>> =
    this.chartsStateService.select('configTemplate');
  protected constants = this.chartsStateService.select('constants');

  constructor(private chartsStateService: ChartsStateService) {}
}
