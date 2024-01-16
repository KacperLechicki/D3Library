import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/controls/button/button.component';

@Component({
  selector: 'ui-homepage-default',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './homepage-default.component.html',
  styleUrl: './homepage-default.component.scss',
})
export class HomepageDefaultComponent {
  protected readonly logoPath = 'assets/logo/logo.png';

  protected openD3Link(url: string): void {
    window.open(url, '_blank');
  }
}
