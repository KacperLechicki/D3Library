import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/controls/button/button.component';
import { GlowingDotBgComponent } from '../../../../shared/components/common/glowing-dots-bg/glowing-dots-bg.component';

@Component({
  selector: 'ui-homepage-default',
  standalone: true,
  imports: [ButtonComponent, GlowingDotBgComponent],
  templateUrl: './homepage-default.component.html',
  styleUrl: './homepage-default.component.scss',
})
export class HomepageDefaultComponent {
  protected readonly logoPath = 'assets/logo/logo.png';

  protected openD3Link(url: string): void {
    window.open(url, '_blank');
  }
}
