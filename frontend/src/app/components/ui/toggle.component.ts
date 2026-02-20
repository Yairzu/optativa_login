import { Component, Output, EventEmitter, signal } from '@angular/core';
import { IconComponent } from './icon/icon.component';

@Component({
  selector: 'app-password-toggle',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './toggle.component.html'
})
export class PasswordToggleComponent {

  private _visible = signal(false);
  visible = this._visible.asReadonly();

  @Output() visibilityChange = new EventEmitter<boolean>();

  toggle(): void {
    const value = !this._visible();
    this._visible.set(value);
    this.visibilityChange.emit(value);
  }
}