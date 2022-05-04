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
          console.log(this.issueList)
        }
      );

    this.sub = this.apiService.getMacroLinks(this.id, this.issue_id)
      .subscribe(
        (macro: Issue[]) => {

          this.macroIssues = macro;
          console.log(this.macroIssues)
        }
      );
  }

  /* onCheckIssueDetails() {
    this.router.navigate(['project_details', this.id, 'issue_details', this.issue_id]);

  } */

}
