import { Component, OnDestroy } from '@angular/core';
import { ButtonComponent } from '../../controls/button/button.component';
import { ThemeStateService } from '../../../store/theme/theme-state.service';
import { Theme } from '../../../interfaces/theme.interface';

@Component({
  selector: 'sh-theme-popover',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './theme-popover.component.html',
  styleUrl: './theme-popover.component.scss',
})
export class ThemePopoverComponent implements OnDestroy {
  protected theme = this.themeStateService.state;
  protected readonly Theme = Theme;

  constructor(private themeStateService: ThemeStateService) {}

  ngOnDestroy(): void {
    this.themeStateService.destroy();
  }

  protected toggleTheme(): void {
    this.themeStateService.set(
      'mode',
      this.theme().mode === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  }
}
