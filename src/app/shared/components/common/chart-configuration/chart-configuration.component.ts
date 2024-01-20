import { Component, OnInit, Signal, TemplateRef } from '@angular/core';
import { ChartsStateService } from '../../../store/charts/charts-state.service';
import { NgTemplateOutlet } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../controls/input/input.component';
import { ButtonComponent } from '../../controls/button/button.component';
import { ConstantsFormService } from './services/constants-form.service';

@Component({
  selector: 'sh-chart-configuration',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
  ],
  templateUrl: './chart-configuration.component.html',
  styleUrl: './chart-configuration.component.scss',
  providers: [ConstantsFormService],
})
export class ChartConfigurationComponent implements OnInit {
  protected constantsFormGroup!: FormGroup;

  protected configuration: Signal<TemplateRef<any>> =
    this.chartsStateService.select('configTemplate');
  protected constants = this.chartsStateService.select('constants');

  constructor(
    private chartsStateService: ChartsStateService,
    private constantsFormService: ConstantsFormService
  ) {}

  ngOnInit(): void {
    this.constantsFormGroup = this.constantsFormService.buildForm();
  }

  protected getFormGroup(key: string): FormGroup {
    return this.constantsFormGroup.controls[key] as FormGroup;
  }

  protected submit(): void {
    this.constantsFormService.submit(this.constantsFormGroup);
  }

  protected setDefault(): void {
    this.constantsFormService.setDefault();
    this.constantsFormGroup = this.constantsFormService.buildForm();
  }
}
