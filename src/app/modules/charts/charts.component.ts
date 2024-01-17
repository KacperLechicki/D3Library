import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlowingDotBgComponent } from '../../shared/components/common/glowing-dots-bg/glowing-dots-bg.component';

@Component({
  selector: 'ui-charts',
  standalone: true,
  imports: [RouterOutlet, GlowingDotBgComponent],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent {}
