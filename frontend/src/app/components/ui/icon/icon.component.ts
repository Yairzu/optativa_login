import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type IconName = 'eye' | 'eye-off';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html'
})
export class IconComponent {
  @Input({ required: true }) name!: IconName;
}