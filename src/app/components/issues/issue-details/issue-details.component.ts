import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { Issue } from 'src/app/models/issues.model';
import { Project } from 'src/app/models/project.model';
import { ApiService } from 'src/app/services/api-service/api-service.service';

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.css']
})
export class IssueDetailsComponent implements OnInit {

  issue_id: number;
  id: number;
  sub: Subscription;

  public issueList = <any>[];
  public project = <any>[];
  public macroIssues = <any>[];
  public totalTimeSpentSecs = 0;
  public totalTimeSpent;
  public timeEstimate;

  constructor(private apiService: ApiService,
    private route: ActivatedRoute) { Chart.register(...registerables) }

  ngOnInit(): void {

    /* console.log(this.id)
    console.log(this.issue_id) */

    this.route.params
      .subscribe(
        (params: Params) => {

          this.id = +params['id'];
          this.issue_id = +params['issue_id'];
        }
      );

    /* console.log(this.id)
    console.log(this.issue_id) */

    this.sub = this.apiService.getProjectById(this.id)
      .subscribe(
        (proj: Project[]) => {
          this.project = proj;
        }
      );

    this.sub = this.apiService.getIssueDetailsById(this.id, this.issue_id)
      .subscribe(
        (issue: Issue[]) => {

          this.issueList = issue;
          this.timeEstimate = this.time_convert(this.issueList.time_stats.time_estimate);
        }
      );

    this.sub = this.apiService.getIssueLinks(this.id, this.issue_id)
      .subscribe(
        (macro: Issue[]) => {

          this.macroIssues = macro;

          this.getTotalTimeSpent(this.macroIssues);
        }
      );
  }


  getTotalTimeSpent(macros) {

    macros.forEach(element => {
      this.totalTimeSpentSecs = this.totalTimeSpentSecs + element.time_stats.total_time_spent;
    });

    this.totalTimeSpent = this.time_convert(this.totalTimeSpentSecs);

  }

  time_convert(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;

  }

  /* onCheckIssueDetails() {
    this.router.navigate(['project_details', this.id, 'issue_details', this.issue_id]);

  } */

}
