import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api-service.service';
import { LoadingService } from 'src/app/services/loading';
import { User } from '../../models/users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  sub: Subscription;
  public usersList = [];
  public activeUsersList = [];
  loading$ = this.loader.loading$;

  constructor(private apiService: ApiService, public loader: LoadingService) { }

  ngOnInit(): void {

    this.sub = this.apiService.getUsers()
      .subscribe(
        (users: User[]) => {
          this.usersList = users;
          /*  console.log(projectList); */
          this.getActiveUsers(this.usersList);
        }
      );

  }

  getActiveUsers(usersList) {
    usersList.forEach(element => {
      if (element.state == "active") {
        this.activeUsersList.push(element);
      }
    });
  }

  onUserSelected() {

    /* console.log(this.issue_item.iid);
    /*  project_details/:id/issue_details/:issue_id */
    /*  this.router.navigate([this.issue_item.iid, 'issue_details',]); */
    //this.router.navigate(['project_details', this.issue_item.project_id, 'issue_details', this.issue_item.iid]);
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route}); */
  }

}
