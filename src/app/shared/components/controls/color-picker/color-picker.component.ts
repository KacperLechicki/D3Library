import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'sh-color-picker',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
})
export class ColorPickerComponent {
  @Input() formGroup!: FormGroup;
  @Input() controlName = '';
}
