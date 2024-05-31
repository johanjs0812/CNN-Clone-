import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService, UserData } from "../services/user.service";
import { Saveurlservice } from "../services/saveurl.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  username = '';
  password = '';
  email = '';
  dataToSend = {};
  responses = '';
  err1 = '';
  err2 = '';

  private subscription: Subscription = new Subscription();

  constructor(
    private usersService: UsersService,
    private router: Router,
    private saveurlservice: Saveurlservice
  ){}

  ngOnInit(): void {

  }

  /// GET VALUE
  onPasswordInputChange(event: any) {
    this.password = event.target.value;
  }

  onEmailInputChange(event: any) {
    this.email = event.target.value;
  }

  async login($event: MouseEvent){
    $event.preventDefault();
    this.dataToSend = {
      password: this.password,
      email: this.email,
    };
    try {
      const response = await this.usersService.login(this.dataToSend);

      // LOGIN OK
      if ('user' in response) {
        let previousUrl = this.saveurlservice.getPreviousUrl();
        if (previousUrl) {
          this.router.navigateByUrl(previousUrl);
        } else {
          this.router.navigateByUrl('/home');
        }
      }

      /// KIEM LOI

      if (response.warning1) {
        this.err1 = response.warning1;
      }else{
        this.err1 = '';
      };

      if (response.warning2) {
        this.err2 = response.warning2;
      }else{
        this.err2 = '';
      };
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

}
