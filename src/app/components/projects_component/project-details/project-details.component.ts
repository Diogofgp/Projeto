import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/api-service/api-service.service';
import { Project } from '../project.model';
import { Subscription } from 'rxjs';
import { Issue } from './issues.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  id: number;
  projectId: Project;

  sub: Subscription;

  public project: Project[];
  public issuesList = [];

  totalIssues = 0;
  totalTimeSpent = 0;
  users = [];

  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.projectId = this.apiService.getProjectId(this.id);

        }
      );

    this.sub = this.apiService.getProjectById(this.id)
      .subscribe(
        (proj: Project[]) => {
          this.project = proj;
        }
      );

    this.sub = this.apiService.getIssues(this.id)
      .subscribe(
        (issues: Issue[]) => {
          this.issuesList = issues;
          this.getTimeSpent(this.issuesList)
        }
      );

  }

  getTimeSpent(issues) {
    this.totalIssues = issues.length;

    for (let i = 0; i < issues.length; i++) {
      this.totalTimeSpent = this.totalTimeSpent + issues[i].time_stats.total_time_spent;
      if (issues[i].assignee || issues[i].assignee != null) {
        this.users.push(issues[i].assignee.username);
      }
    }
    this.totalTimeSpent = this.totalTimeSpent / 3600;
    console.log("PROJETO: ", this.project);
  }

  onCheckDetails() {
    this.router.navigate(['project_details', this.id]);
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  getProjectDetails() {
    console.log(this.apiService.getProjectById(this.id));
    return this.apiService.getProjectById(this.id);
  }

}
