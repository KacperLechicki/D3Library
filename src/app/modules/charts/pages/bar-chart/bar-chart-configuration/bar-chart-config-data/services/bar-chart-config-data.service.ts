import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BarChartStateService } from '../../../../../../../shared/store/charts/bar-chart/bar-chart-state.service';

@Injectable()
export class BarChartConfigDataService {
  private _dataForm!: FormGroup;

  constructor(private barChartService: BarChartStateService) {
    this.buildForm();
  }

  public buildForm(): FormGroup {
    this._dataForm = new FormGroup({
      data: new FormControl<string>(JSON.parse('[]')),
      xAxisProperty: new FormControl<string>(''),
      yAxisProperty: new FormControl<string>(''),
    });

    return this._dataForm;
  }

  public submit(form: FormGroup): void {
    if (form.valid) {
      const formValue = form.getRawValue();

      this.barChartService.setState({
        data: JSON.parse(
          formValue.data && formValue.data.length !== 0 ? formValue.data : '[]'
        ),
        configuration: {
          xAxisProperty: formValue.xAxisProperty || '',
          yAxisProperty: formValue.yAxisProperty || '',
        },
      });
    }
  }

  public setDefault(): void {
    this.barChartService.setState({
      data: JSON.parse('[]'),
      configuration: {
        xAxisProperty: '',
        yAxisProperty: '',
      },
    });
  }
}
