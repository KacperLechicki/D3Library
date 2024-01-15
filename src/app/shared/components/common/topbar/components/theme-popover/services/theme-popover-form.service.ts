import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemeStateService } from '../../../../../../store/theme/theme-state.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemePopoverFormService {
  private _formGroup: FormGroup = new FormGroup({});

  constructor(private themeStateService: ThemeStateService) {
    this.buildForm();
  }

  private buildForm(): void {
    this._formGroup = new FormGroup({
      primary: new FormControl<string>(
        this.themeStateService.select('primary')()
      ),
      secondary: new FormControl<string>(
        this.themeStateService.select('secondary')()
      ),
      tertiary: new FormControl<string>(
        this.themeStateService.select('tertiary')()
      ),
    });

    this._formGroup.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(500))
      .subscribe(
        (values: {
          primary: string;
          secondary: string;
          tertiary: string;
        }): void => {
          this.themeStateService.set('primary', values.primary);
          this.themeStateService.set('secondary', values.secondary);
          this.themeStateService.set('tertiary', values.tertiary);
        }
      );
  }

  public getFormGroup(): FormGroup {
    return this._formGroup;
  }
}
