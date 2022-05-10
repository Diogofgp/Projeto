import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/users.model';
import { ApiService } from 'src/app/services/api-service/api-service.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @Output() userWasSelected = new EventEmitter<User>();

  sub: Subscription;
  public usersList = [];
  public activeUsersList = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

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
    console.log(this.activeUsersList);
  }

}
