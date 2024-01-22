import { Component, Signal, TemplateRef } from '@angular/core';
import { BarChartStateService } from '../../../../../shared/store/charts/bar-chart/bar-chart-state.service';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'sh-code-snippet',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './code-snippet.component.html',
  styleUrl: './code-snippet.component.scss',
})
export class CodeSnippetComponent {
  protected code: Signal<TemplateRef<any>> =
    this.barChartStateService.select('code');

  constructor(private barChartStateService: BarChartStateService) {}
}
