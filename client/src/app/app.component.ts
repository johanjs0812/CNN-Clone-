import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Event, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CNN';
  isHidden: boolean = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isHidden = event.urlAfterRedirects.startsWith('/admin');
    });
  }

  ngOnInit(): void {

  }


}

