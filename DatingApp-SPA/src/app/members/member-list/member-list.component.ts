import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { PaginatedResult, Pagination } from '../../_models/pagination';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  users: User[];
  pagination: Pagination;

  constructor(private userService: UserService,
     private alertifyService: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagi;
      // this.loadUsers();
      console.log(this.pagination.currentPage);
    });
  }

  pageChanged(pageNo: number): void {
    this.pagination.currentPage = pageNo;
  }

  // loadUsers() {
  //   this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage).
  //   subscribe((res: PaginatedResult<User[]>) => {
  //     this.users = res.result;
  //     this.pagination = res.pagination;
  //   }, error => {
  //     this.alertifyService.error(error);

  //   });
  // }

}
