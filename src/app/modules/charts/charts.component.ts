import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ChartsStateService } from '../../shared/store/charts/charts-state.service';
import { ButtonComponent } from '../../shared/components/controls/button/button.component';
import { AccordionComponent } from '../../shared/components/common/accordion/accordion.component';

@Component({
  selector: 'ui-charts',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, RouterLink, AccordionComponent],
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
