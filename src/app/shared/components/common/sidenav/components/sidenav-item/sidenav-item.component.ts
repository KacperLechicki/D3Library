import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'sh-sidenav-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidenav-item.component.html',
  styleUrl: './sidenav-item.component.scss',
})
export class SidenavItemComponent {
  @Input() path = '';
}
