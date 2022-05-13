import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Issue } from 'src/app/models/issues.model';
import { Milestone } from 'src/app/models/milestones.model';
import { ApiService } from 'src/app/services/api-service/api-service.service';
import { LoadingService } from 'src/app/services/loading';

@Component({
  selector: 'app-milestones-details',
  templateUrl: './milestones-details.component.html',
  styleUrls: ['./milestones-details.component.css']
})
export class MilestonesDetailsComponent implements OnInit {

  milestone_id: number;
  id: number;
  sub: Subscription;
  loading$ = this.loader.loading$;

  //public milestone = <any>[];
  public milestoneIssues = <any>[];
  milestoneList: Milestone[];

  constructor(private apiService: ApiService,
    private route: ActivatedRoute, private router: Router, public loader: LoadingService) { }

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.milestone_id = +params['milestone_id'];

        }
      );

    this.sub = this.apiService.getMilestones(this.id)
      .subscribe(
        (m: Milestone[]) => {
          this.milestoneList = m;
          //console.log("MS: ", this.milestoneList)
        }
      );

    // var num = this.milestone_iid - 1;
    //console.log(num + "num value");

    console.log(this.milestone_id)
    this.sub = this.apiService.getIssuesByMilestone(this.id, this.milestone_id)
      .subscribe(
        (issue: Issue[]) => {

          issue.forEach(element => {
            element.labels.forEach(e => {
              if (e == "Macro ♠") {
                this.milestoneIssues.push(element)
              }
            });
          });

          //this.milestoneIssues = issue;
          //console.log("Macros?: ", this.milestoneIssues)
          //console.log(this.milestone)
        }
      );

  }

  onIssueSelected(issue) {

    //console.log("ISSUE ID ON CLICK: ", issue.iid);
    /*  project_details/:id/issue_details/:issue_id */
    /*  this.router.navigate([this.issue_item.iid, 'issue_details',]); */
    this.router.navigate(['project_details', issue.project_id, 'issue_details', issue.iid]);
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

}
