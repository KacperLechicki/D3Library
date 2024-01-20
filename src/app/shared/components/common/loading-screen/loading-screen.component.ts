import { Component, effect } from '@angular/core';
import { LoadingStateService } from '../../../store/loading/loading-state.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'sh-loading-screen',
  standalone: true,
  imports: [NgClass],
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.scss',
})
export class LoadingScreenComponent {
  protected readonly loadingScreen =
    this.loadingStateService.select('loadingScreen');
  protected loadingOn = false;

  constructor(private loadingStateService: LoadingStateService) {
    effect((): void => {
      if (!this.loadingScreen()) {
        setTimeout((): void => {
          this.loadingOn = false;
        }, 500);
      } else {
        this.loadingOn = true;
      }
    });
  }
}
