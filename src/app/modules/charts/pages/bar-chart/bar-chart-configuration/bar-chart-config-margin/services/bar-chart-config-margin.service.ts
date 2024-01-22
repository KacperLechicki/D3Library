import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BarChartStateService } from '../../../../../../../shared/store/charts/bar-chart/bar-chart-state.service';

@Injectable()
export class BarChartConfigMarginService {
  private _marginForm!: FormGroup;

  constructor(private barChartStateService: BarChartStateService) {
    this.buildForm();
  }

  public buildForm(): FormGroup {
    const configurationDefault =
      this.barChartStateService.select('configuration')();

    this._marginForm = new FormGroup({
      marginTop: new FormControl<number>(configurationDefault.margin?.top || 0),
      marginBottom: new FormControl<number>(
        configurationDefault.margin?.bottom || 0
      ),
      marginRight: new FormControl<number>(
        configurationDefault.margin?.right || 0
      ),
      marginLeft: new FormControl<number>(
        configurationDefault.margin?.left || 0
      ),
    });

    return this._marginForm;
  }

  public submit(form: FormGroup): void {
    if (form.valid) {
      const formValue = form.getRawValue();

      this.barChartStateService.setState({
        configuration: {
          margin: {
            top: formValue.marginTop,
            bottom: formValue.marginBottom,
            right: formValue.marginRight,
            left: formValue.marginLeft,
          },
        },
      });
    }
  }

  public setDefault(): void {
    this.barChartStateService.setState({
      configuration: {
        margin: { top: 40, right: 30, bottom: 40, left: 60 },
      },
    });
  }
}
