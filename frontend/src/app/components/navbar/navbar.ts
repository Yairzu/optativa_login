import {
  Component,
  signal,
  inject,
  ElementRef,
  HostListener,
  DestroyRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent {

  mobileOpen = signal(false);
  profileOpen = signal(false);

  private authService = inject(AuthService);
  private router = inject(Router);
  private elementRef = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  user$: Observable<User | null>;

  constructor() {
    this.user$ = this.authService.getUser$();

    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.mobileOpen.set(false);
        this.profileOpen.set(false);
      });
  }

  toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  toggleProfile(): void {
    this.profileOpen.update((v) => !v);
  }

  closeProfile(): void {
    this.profileOpen.set(false);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.mobileOpen.set(false);
    this.profileOpen.set(false);
  }

  getRoleLabel(roleId?: number): string {
    switch (roleId) {
      case 1:
        return 'ADMIN';
      case 2:
        return 'USER';
      default:
        return 'ROLE';
    }
  }

  getDisplayName(user: User | null): string {
    return user?.nick_user || user?.name || 'Usuario';
  }

  getInitial(user: User | null): string {
    return this.getDisplayName(user).charAt(0).toUpperCase();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.profileOpen.set(false);
    }
  }
}