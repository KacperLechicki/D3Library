import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'sh-input',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() label = '';
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text';
  @Input() dark = false;
}
