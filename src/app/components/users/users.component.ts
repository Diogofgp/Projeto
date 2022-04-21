import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api-service/api-service.service';
import { User } from './users.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  sub: Subscription;

  public usersList = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {

    this.sub = this.apiService.getUsers()
      .subscribe(
        (users: User[]) => {
          this.usersList = users;
          /*  console.log(projectList); */
        }
      );

  }

}
