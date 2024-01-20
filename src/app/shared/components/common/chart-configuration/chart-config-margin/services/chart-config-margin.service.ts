import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChartsStateService } from '../../../../../store/charts/charts-state.service';

@Injectable()
export class ChartConfigMarginService {
  private _marginForm!: FormGroup;

  constructor(private chartsStateService: ChartsStateService) {
    this.buildForm();
  }

  public buildForm(): FormGroup {
    const constantsDefault = this.chartsStateService.select('constants')();

    this._marginForm = new FormGroup({
        marginTop: new FormControl<number>(constantsDefault.margin.top || 0),
        marginBottom: new FormControl<number>(
          constantsDefault.margin.bottom || 0
        ),
        marginRight: new FormControl<number>(
          constantsDefault.margin.right || 0
        ),
        marginLeft: new FormControl<number>(constantsDefault.margin.left || 0),
    });

    return this._marginForm;
  }

  public submit(form: FormGroup): void {
    if (form.valid) {
      const formValue = form.getRawValue();

      this.chartsStateService.setState({
        constants: {
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
    this.chartsStateService.setState({
      constants: {
        margin: { top: 40, right: 30, bottom: 40, left: 60 },
      },
    });
  }
}
