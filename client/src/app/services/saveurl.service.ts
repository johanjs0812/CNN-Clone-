import { Injectable } from '@angular/core';
import { Event, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Saveurlservice {
  private _previousUrl: string = '';
  private _currentUrl: string = '';

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this._previousUrl = this._currentUrl; // Lưu URL hiện tại vào _previousUrl
      this._currentUrl = event.url; // Cập nhật URL hiện tại
      console.log('Current URL:', this._currentUrl); // In ra URL hiện tại
      console.log('Stored previous URL:', this._previousUrl); // In ra URL đã lưu
    });
  }

  getPreviousUrl(): string {
    return this._previousUrl;
  }
}

