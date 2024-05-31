import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { UsersService, UserData } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  currentUser: UserData | null = null;
  categories: any[] = [];

  private subscription: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private userService: UsersService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    let storedUser = localStorage.getItem('logn?user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.userService.currentUser.next(this.currentUser);
    }

    this.http.get<any[]>('http://localhost:3000/api/cnn/category').subscribe((categories: any[]) => {
      this.categories = categories;
    });

    this.subscription = this.userService.currentUser.subscribe(Response => {
      if (Response?.user && !storedUser) {
        this.currentUser = Response.user;
        localStorage.setItem('logn?user', JSON.stringify(Response.user));
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clearUser(): void {
    localStorage.removeItem('logn?user');
    this.currentUser = null;
    this.userService.currentUser.next(this.currentUser);
    this.router.navigateByUrl('/login');
  };

}
