import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/controls/button/button.component';
import { GlowingDotBgComponent } from '../../shared/components/common/glowing-dots-bg/glowing-dots-bg.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ui-homepage',
  standalone: true,
  imports: [ButtonComponent, GlowingDotBgComponent, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent implements OnInit {
  protected readonly logoPath = 'assets/logo/logo.png';

  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      document.title = 'D3Library | Home';
    }
  }

  protected openD3Link(url: string): void {
    window.open(url, '_blank');
  }
}
