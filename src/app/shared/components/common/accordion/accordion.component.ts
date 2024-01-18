import { Component, Input, OnInit } from '@angular/core';
import { ButtonComponent } from '../../controls/button/button.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'sh-accordion',
  standalone: true,
  imports: [ButtonComponent, NgClass],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent implements OnInit {
  @Input() count: number = 0;
  @Input() labels: string[] = [];

  protected items: number[] = [];
  protected contentOpen: boolean[] = [];

  ngOnInit(): void {
    this.items = Array.from(
      { length: this.count },
      (_: unknown, i: number): number => i
    );
    this.contentOpen = Array(this.count).fill(false);
  }
}
