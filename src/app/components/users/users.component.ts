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
  loading$ = this.loader.loading$;

  constructor(private apiService: ApiService, public loader: LoadingService) { }

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
