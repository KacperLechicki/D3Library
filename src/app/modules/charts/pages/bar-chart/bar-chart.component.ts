import { Component, OnInit } from '@angular/core';
import { ChartsStateService } from '../../../../shared/store/charts/charts-state.service';
import { ChartCardComponent } from '../../../../shared/components/common/chart-card/chart-card.component';

@Component({
  selector: 'bar-chart',
  standalone: true,
  imports: [ChartCardComponent],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent implements OnInit {
  constructor(private chartsStateService: ChartsStateService) {}

  ngOnInit(): void {
    this.chartsStateService.setState({
      currentChart: 'Bar Chart',
    });
  }
}
