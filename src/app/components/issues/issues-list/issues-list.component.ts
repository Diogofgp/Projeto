import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { Subscription } from 'rxjs';
import { Issue } from 'src/app/models/issues.model';
import { Project } from 'src/app/models/project.model';
import { ApiService } from 'src/app/services/api-service/api-service.service';
import { LoadingService } from 'src/app/services/loading';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.css']
})
export class IssuesListComponent implements OnInit {

  @Output() issueWasSelected = new EventEmitter<Issue>();

  /* issue_id: number; */
  id: number;
  public issuesList = [];
  public projectList = [];
  subscription: Subscription;
  totalIssuesOpened: number = 0;
  totalIssuesClosed: number = 0;


  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.subscription = this.apiService.getProjects()
      .subscribe(
        (projectList: Project[]) => {
          this.projectList = projectList;
        }
      );

    this.route.params
      .subscribe(
        (params: Params) => {
          /* project id */
          this.id = +params['id'];
        }
      );

    this.subscription = this.apiService.getIssuesByProjectId(this.id)
      .subscribe(
        (issue: Issue[]) => {
          console.log(this.id)
          /*  console.log(this.id)
           console.log(this.issue_id) */
          this.issuesList = issue;
          this.getTotalIssuesOpened();
          this.getTotalIssuesClosed();
        }
      );
  }

  getTotalIssuesOpened() {

    this.issuesList.forEach(issue => {
      if (issue.state == "opened")
        this.totalIssuesOpened++;
    });
    return this.totalIssuesOpened;
  }

  getTotalIssuesClosed() {

    this.issuesList.forEach(issue => {
      if (issue.state == "closed")
        this.totalIssuesClosed++;
    });
    return this.totalIssuesClosed;
  }



}
