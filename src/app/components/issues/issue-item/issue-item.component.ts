import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { Issue } from 'src/app/models/issues.model';
import { Project } from 'src/app/models/project.model';
import { ApiService } from 'src/app/services/api-service/api-service.service';

@Component({
  selector: 'app-issue-item',
  templateUrl: './issue-item.component.html',
  styleUrls: ['./issue-item.component.css']
})
export class IssueItemComponent implements OnInit {

  @Input() issue_item: Issue;
  /*   @Input() project_item: Project; */
  @Input() index: number;
  /*  @Input() index2: number; */

  id: number;
  sub: Subscription;
  public project = <any>[];

  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) {
    Chart.register(...registerables)
  }

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params: Params) => {

          /*   console.log(this.issue_item) */

          this.id = +params['id'];
          /* this.issue_item.iid = +params['issue_id']; */

          /* console.log(this.id)
          console.log(this.issue_item) */
          /*  this.projectId = this.apiService.getProjectId(this.id); */
        }
      );

    this.sub = this.apiService.getProjectById(this.id)
      .subscribe(
        (proj: Project[]) => {
          this.project = proj;
        }
      );

  }

  onIssueSelected() {

    console.log(this.issue_item.iid);
    /*  project_details/:id/issue_details/:issue_id */
    /*  this.router.navigate([this.issue_item.iid, 'issue_details',]); */
    this.router.navigate(['project_details', this.issue_item.project_id, 'issue_details', this.issue_item.iid]);
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

}
