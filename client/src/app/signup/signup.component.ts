import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from "../services/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  constructor(
    private usersService: UsersService,
    private router: Router,
  ){}

  username = '';
  password = '';
  email = '';
  dataToSend = {};
  responses = '';
  err1 = '';
  err2 = '';

  ngOnInit(): void {

  }

  /// GET VALUE
  onUsernameInputChange(event: any) {
    this.username = event.target.value;
  }

  onPasswordInputChange(event: any) {
    this.password = event.target.value;
  }

  onEmailInputChange(event: any) {
    this.email = event.target.value;
  }

  async add($event: MouseEvent){
    $event.preventDefault();
    this.dataToSend = {
      username: this.username,
      password: this.password,
      email: this.email,
    };
    try {
      const response = await this.usersService.singup(this.dataToSend);
      console.log('nhadi', response);

      if (response.warning1) {
        this.err1 = response.warning1;
      };

      if (response.warning2) {
        this.err2 = response.warning2;
      };

    } catch (error) {
      console.error('An error occurred:', error);
    }
  }


}
