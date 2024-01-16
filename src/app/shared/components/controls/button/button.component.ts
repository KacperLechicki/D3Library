import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

interface ButtonType {
  primary: boolean;
  secondary: boolean;
  tertiary: boolean;
  blank: boolean;
  icon: boolean;
}

@Component({
  selector: 'sh-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() type: 'primary' | 'secondary' | 'tertiary' | 'blank' | 'icon' =
    'primary';
  @Output() onClick = new EventEmitter<MouseEvent>();

  protected emitClick(event: MouseEvent): void {
    this.onClick.emit(event);
  }

  protected checkType(): ButtonType {
    return {
      primary: this.type === 'primary',
      secondary: this.type === 'secondary',
      tertiary: this.type === 'tertiary',
      blank: this.type === 'blank',
      icon: this.type === 'icon',
    };
  }
}
