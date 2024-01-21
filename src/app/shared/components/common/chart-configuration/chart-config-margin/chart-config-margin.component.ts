import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartConfigMarginService } from './services/chart-config-margin.service';
import { InputComponent } from '../../../controls/input/input.component';
import { ButtonComponent } from '../../../controls/button/button.component';
import { AccordionComponent } from '../../accordion/accordion.component';

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
  templateUrl: './chart-config-margin.component.html',
  styleUrl: './chart-config-margin.component.scss',
  providers: [ChartConfigMarginService],
})
export class ChartConfigMarginComponent {
  protected marginFormGroup!: FormGroup;

  constructor(private chartConfigMarginService: ChartConfigMarginService) {}

  ngOnInit(): void {
    this.marginFormGroup = this.chartConfigMarginService.buildForm();
  }

  protected submit(): void {
    this.chartConfigMarginService.submit(this.marginFormGroup);
  }

  protected setDefault(): void {
    this.chartConfigMarginService.setDefault();
    this.marginFormGroup = this.chartConfigMarginService.buildForm();
  }
}
