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

  id: number;
  kek: number;
  public issuesList = [];
  subscription: Subscription;
  loading$ = this.loader.loading$;

  constructor(private apiService: ApiService, public loader: LoadingService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    /* this.subscription = this.apiService.getProjects()
    .subscribe(
      (projectList: Project[]) => {
        this.projectList = projectList;
      }
    ); */

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];

        }
      );

    this.subscription = this.apiService.getIssuesByProjectId(this.id)
      .subscribe(
        (issue: Issue[]) => {
          this.issuesList = issue;
        }
      );
  }



}
