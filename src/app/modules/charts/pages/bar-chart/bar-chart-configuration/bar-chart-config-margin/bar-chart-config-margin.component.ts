import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarChartConfigMarginService } from './services/bar-chart-config-margin.service';
import { InputComponent } from '../../../../../../shared/components/controls/input/input.component';
import { ButtonComponent } from '../../../../../../shared/components/controls/button/button.component';
import { AccordionComponent } from '../../../../../../shared/components/common/accordion/accordion.component';

@Component({
  selector: 'chart-config-margin',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    AccordionComponent,
  ],
  templateUrl: './bar-chart-config-margin.component.html',
  styleUrl: './bar-chart-config-margin.component.scss',
  providers: [BarChartConfigMarginService],
})
export class BarChartConfigMarginComponent {
  protected marginFormGroup!: FormGroup;

  constructor(
    private barChartConfigMarginService: BarChartConfigMarginService
  ) {}

  ngOnInit(): void {
    this.marginFormGroup = this.barChartConfigMarginService.buildForm();
  }

  protected submit(): void {
    this.barChartConfigMarginService.submit(this.marginFormGroup);
  }

  protected setDefault(): void {
    this.barChartConfigMarginService.setDefault();
    this.marginFormGroup = this.barChartConfigMarginService.buildForm();
  }
}
