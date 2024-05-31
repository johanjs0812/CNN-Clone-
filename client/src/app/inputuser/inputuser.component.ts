import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationEnd } from '@angular/router';
import { UsersService } from '../services/user.service';


@Component({
  selector: 'app-inputuser',
  templateUrl: './inputuser.component.html',
  styleUrls: ['./inputuser.component.css']
})
export class InputuserComponent implements OnInit{
  x = '';
  page = '';
  title = '';
  users: any[] = [];
  selectedInfo: any;

  role = 'user';
  username = '';
  password = '';
  email = '';
  dataToSend = {};
  button: boolean = false;
  isHidden: boolean = false;
  Id = '';

  constructor (private router: Router, private usersService: UsersService) {}

  ngOnInit() {
    this.selectedInfo = this.usersService.getSelectedInfo();

    if (this.selectedInfo) {
        this.username = this.selectedInfo.username;
        this.password = this.selectedInfo.password;
        this.email = this.selectedInfo.email;
        this.role = this.selectedInfo.role;
        this.Id = this.selectedInfo.id;
    }

    const urlParts = this.router.url.split('/');
    const adminRoute = urlParts[2];

    if (adminRoute === 'adduser') {
      this.isHidden = true;
      this.page = 'Add new user';
    }
    else {
      this.isHidden = false;
      this.page = 'Edit user';
    }
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

  onRoleChange(event: any) {
    this.role = event.target.value;
  }

  // FUNCTION

  add(){
    this.dataToSend = {
      username: this.username,
      password: this.password,
      email: this.email,
      role: this.role
    };
    this.usersService.addData(this.dataToSend);
  }

  edit(id: string) {
    this.dataToSend = {
      username: this.username,
      password: this.password,
      email: this.email,
      role: this.role
    };
    this.usersService.updatedata(id, this.dataToSend);
  }


}
