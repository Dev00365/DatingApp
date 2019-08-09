import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';


// const httpOpt = {
//   headers: new HttpHeaders({
//     'Authorization' : 'Bearer ' + localStorage.getItem('token') })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;

constructor(private http: HttpClient) { }

getUsers(page? , itemsPerPage?): Observable<PaginatedResult<User[]>> {
  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

  let params = new HttpParams();
if (page != null && itemsPerPage != null) {
  params = params.append('pageNumber',  page);
  params = params.append('pageSize' ,  itemsPerPage);
}

  return this.http.get<User[]>(this.baseUrl + 'users/', { observe: 'response', params}).pipe(
    map( response => {
      paginatedResult.result = response.body;
      if (response.headers.get('Pagination') != null) {
        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
      }
      return paginatedResult;
    })
  );

}


getUser(id): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id);
}
updateUser(id: number, user: User) {
   return this.http.put(this.baseUrl + 'users/' + id, user);
 }

 setMainPhoto(userId: number, id: number) {

  return this.http.post( this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
 }
 DeletePhoto(userId: number, id: number) {

  return this.http.delete( this.baseUrl + 'users/' + userId + '/photos/' + id );
 }
}
