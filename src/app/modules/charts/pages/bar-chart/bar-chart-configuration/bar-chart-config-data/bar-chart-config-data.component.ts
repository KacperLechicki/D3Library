import { Component, signal } from '@angular/core';
import { BarChartConfigDataService } from './services/bar-chart-config-data.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../../../shared/components/controls/button/button.component';
import { AccordionComponent } from '../../../../../../shared/components/common/accordion/accordion.component';
import { TextareaComponent } from '../../../../../../shared/components/controls/textarea/textarea.component';
import { InputComponent } from '../../../../../../shared/components/controls/input/input.component';

@Component({
  selector: 'chart-config-data',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TextareaComponent,
    ButtonComponent,
    AccordionComponent,
    InputComponent,
  ],
  templateUrl: './bar-chart-config-data.component.html',
  styleUrl: './bar-chart-config-data.component.scss',
  providers: [BarChartConfigDataService],
})
export class BarChartConfigDataComponent {
  protected dataFormGroup!: FormGroup;
  protected dataFormatFile = signal<boolean>(false);

  constructor(private barChartConfigDataService: BarChartConfigDataService) {}

  ngOnInit(): void {
    this.dataFormGroup = this.barChartConfigDataService.buildForm();
  }

  protected submit(): void {
    this.barChartConfigDataService.submit(this.dataFormGroup);
  }

  protected setDefault(): void {
    this.barChartConfigDataService.setDefault();
    this.dataFormGroup = this.barChartConfigDataService.buildForm();
  }

  protected changeFormat(): void {
    this.dataFormatFile.update((prev: boolean): boolean => !prev);
  }
}
