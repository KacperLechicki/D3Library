import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

interface ButtonType {
  primary: boolean;
  secondary: boolean;
  outlined: boolean;
  blank: boolean;
  icon: boolean;
  dark: boolean;
}

@Component({
  selector: 'sh-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() type: 'primary' | 'secondary' | 'outlined' | 'blank' | 'icon' =
    'primary';
  @Input() name = '';
  @Input() dark = false;
  @Output() onClick = new EventEmitter<MouseEvent>();

  protected emitClick(event: MouseEvent): void {
    this.onClick.emit(event);
  }

  protected checkType(): ButtonType {
    return {
      primary: this.type === 'primary',
      secondary: this.type === 'secondary',
      outlined: this.type === 'outlined',
      blank: this.type === 'blank',
      icon: this.type === 'icon',
      dark: this.dark === true,
    };
  }
}
