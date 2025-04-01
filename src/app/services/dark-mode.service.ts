import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  private storageKey = 'dark-mode';

  constructor() {
    const isDark = this.isDarkMode();
    document.documentElement.classList.toggle('dark', isDark);
  }

  isDarkMode(): boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }

  setDarkMode(enabled: boolean): void {
    localStorage.setItem(this.storageKey, enabled.toString());
    document.documentElement.classList.toggle('dark', enabled);
  }
}
