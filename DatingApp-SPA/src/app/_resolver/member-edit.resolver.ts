import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Route, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()

export class MemberEditResolver implements Resolve<User> {
    /**
     *
     */
    constructor(private userServices: UserService,
        private authService: AuthService,
        private alertify: AlertifyService,
        private router: Router) {   }

        resolve(route: ActivatedRouteSnapshot): Observable<User> {
            return this.userServices.getUser(this.authService.decodeToken.nameid).pipe(
                catchError(error => {
                    this.alertify.error('Problem retrieving your Data');
                    this.router.navigate(['/members']);
                    return of(null);
                })
            );
        }

}