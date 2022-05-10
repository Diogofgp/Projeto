import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/users.model';
import { ApiService } from 'src/app/services/api-service/api-service.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user_item: User;
  @Input() index: number;

  id: number;
  sub: Subscription;
  public user = <any>[];

  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    //console.log("ID DO USER: ", this.index)
    //console.log("ID DO USER: ", this.user_item.id)
    this.sub = this.apiService.getUserById(this.user_item.id)
      .subscribe(
        (user: User[]) => {
          this.user = user;
        }
      );
  }

  onUserSelected() {

    /* console.log(this.issue_item.iid);
    /*  project_details/:id/issue_details/:issue_id */
    /*  this.router.navigate([this.issue_item.iid, 'issue_details',]); */
    this.router.navigate(['user_details', this.user_item.id]);
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route}); */
  }

}
