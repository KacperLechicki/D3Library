import { Component, OnDestroy } from '@angular/core';
import { Theme } from '../../../../../interfaces/theme.interface';
import { ButtonComponent } from '../../../../controls/button/button.component';
import { ThemeStateService } from '../../../../../store/theme/theme-state.service';
import { ColorPickerComponent } from '../../../../controls/color-picker/color-picker.component';
import { ThemePopoverFormService } from './services/theme-popover-form.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'sh-theme-popover',
  standalone: true,
  imports: [
    ButtonComponent,
    ColorPickerComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './theme-popover.component.html',
  styleUrl: './theme-popover.component.scss',
})
export class ThemePopoverComponent implements OnDestroy {
  protected theme = this.themeStateService.state;
  protected readonly Theme = Theme;
  protected themeForm!: FormGroup;

  constructor(
    private themeStateService: ThemeStateService,
    private themePopoverFormService: ThemePopoverFormService
  ) {
    this.themeForm = this.themePopoverFormService.getFormGroup();
  }

  ngOnDestroy(): void {
    this.themeStateService.destroy();
  }

  protected toggleTheme(): void {
    this.themeStateService.set(
      'theme',
      this.theme().theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  }
}
