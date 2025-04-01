import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = signal(false);

  show() {
    this.isLoading.set(true);
  }

  hide() {
    setTimeout(() => this.isLoading.set(false), 800);
  }
}
