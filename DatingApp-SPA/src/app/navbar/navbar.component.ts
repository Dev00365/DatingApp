import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 model: any = {};
 photoUrl: string;
  constructor(public authServices:  AuthService, private alertifyService: AlertifyService , private router: Router) { }

  ngOnInit() {
    this.authServices.currentPhoto.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authServices.login(this.model).subscribe(next => {
      this.alertifyService.success('logged in Successfully');
    }, error => {
      this.alertifyService.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {
    return this.authServices.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authServices.decodeToken = null;
    this.authServices.currentUser = null;
    this.alertifyService.message('logged out');
    this.router.navigate(['/home']);
  }

}
