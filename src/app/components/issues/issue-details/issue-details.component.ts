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

  id: number;
  projectId: Project;
  sub: Subscription;
  public issue = <any>[];

  public project = <any>[];
  projid: number;

  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { Chart.register(...registerables) }

  ngOnInit(): void {

    /* this.sub = this.apiService.getProjectById(this.id)
      .subscribe(
        (proj: Project[]) => {
          this.project = proj;
          this.projectId = this.apiService.getProjectId(this.id);
        }
      );

    this.route.params
      .subscribe(
        (params: Params) => {
          this.issue = +params['issue_id'];

        }
      );

    this.sub = this.apiService.getIssuesByProjectId(this.projectId.id)
      .subscribe(
        (is: Issue[]) => {
          this.issue = is;
        }
      ); */
  }

  onCheckIssueDetails() {
    this.router.navigate(['issue_details', this.id]);
  }

}
