import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { from } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodeToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhoto = this.photoUrl.asObservable();

constructor(private http: HttpClient) { }

changeMemberPhoto(photoUrl: string) {
  this.photoUrl.next(photoUrl);
}

login(model: any) {
  return this.http.post(this.baseUrl + 'login'  , model).pipe(
    map((response: any ) => {
      const user = response;
      if (user) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user.user));
        this.decodeToken = this.jwtHelper.decodeToken(user.token);
        this.currentUser = user.user;
        this.changeMemberPhoto(this.currentUser.photoUrl);
        // console.log(this.decodeToken);
      }
    })
  );
}

register(user: User) {

  return this.http.post(this.baseUrl + 'Register', user );
}

loggedIn() {
  const token = localStorage.getItem('token');
   return !this.jwtHelper.isTokenExpired(token);
}

}
