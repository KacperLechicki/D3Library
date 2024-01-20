import { Component, Signal, TemplateRef } from '@angular/core';
import { ChartsStateService } from '../../../store/charts/charts-state.service';
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
    this.chartsStateService.select('code');

  constructor(private chartsStateService: ChartsStateService) {}
}
