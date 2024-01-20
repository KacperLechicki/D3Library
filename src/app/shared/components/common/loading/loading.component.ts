import { Component, effect, signal } from '@angular/core';
import { LoadingStateService } from '../../../store/loading/loading-state.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'sh-loading',
  standalone: true,
  imports: [NgClass],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
})
export class LoadingComponent {
  protected readonly loadingBusy = this.loadingStateService.select('busy');
  protected loadingOn = false;

  constructor(private loadingStateService: LoadingStateService) {
    effect((): void => {
      if (!this.loadingBusy()) {
        setTimeout((): void => {
          this.loadingOn = false;
        }, 500);
      } else {
        this.loadingOn = true;
      }
    });
  }
}
