import { Component } from '@angular/core';

@Component({
  selector: 'ui-homepage-default',
  standalone: true,
  imports: [],
  templateUrl: './homepage-default.component.html',
  styleUrl: './homepage-default.component.scss',
})
export class HomepageDefaultComponent {
  protected readonly logoPath = 'assets/logo/logo.png';
}
