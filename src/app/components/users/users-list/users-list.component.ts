import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/users.model';
import { ApiService } from 'src/app/services/api-service/api-service.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

/* const ELEMENT_DATA: User[] = [
  {
    id: 1,
    username: 'string',
    name: ,
    description: 'string',
    state: 'string',
    avatar_url: 'string',
    web_url: 'ergoiqerogi'
  }

]; */




@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class UsersListComponent implements OnInit {

  @Output() userWasSelected = new EventEmitter<User>();

  sub: Subscription;
  public usersList = [];
  public activeUsersList = [];


  //columnsToDisplay: string[] = ['id', 'username', 'name', 'description', 'state', 'avatar_url', 'web_url'];
  //dataSource = ELEMENT_DATA;
  //expandedElement: User | null;

  constructor(private apiService: ApiService) { }
  /* 
    dataSource: User[] = [
      {
        id: 12,
        username: 'smth',
        name: 'wofnowuefowueb',
        description: 'string',
        state: 'string',
        avatar_url: 'string',
        web_url: 'ergoiqerogi'
      }
  
    ];
   */

  ngOnInit(): void {

    this.sub = this.apiService.getUsers()
      .subscribe(
        (users: User[]) => {
          this.usersList = users;
          /*  console.log(projectList); */
          this.getActiveUsers(this.usersList);
          console.log(this.activeUsersList);
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



}
