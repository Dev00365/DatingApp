import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Route, Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class MemberListResolver implements Resolve<User[]> {
    /**
     *
     */
PageNumber = 1 ;
PageSize = 10;

    constructor(private userServices: UserService,
        private alertify: AlertifyService,
        private router: Router) {   }

        resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
            return this.userServices.getUsers(this.PageNumber, this.PageSize).pipe(
                catchError(error => {
                    this.alertify.error('Problem retrieving Data');
                    this.router.navigate(['/home']);
                    return of(null);
                })
            );
        }

}
