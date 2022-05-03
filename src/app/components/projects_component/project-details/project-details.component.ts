import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api-service.service';
import { Project } from '../../../models/project.model';
import { Subscription } from 'rxjs';
import { Issue } from '../../../models/issues.model';
import { Label } from '../../../models/labels.model';
import { Chart, registerables } from 'chart.js';
import { MileStones } from '../../../models/milestones.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  id: number;
  projectId: Project;
  sub: Subscription;

  pagenumber: number;
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

  }


  onCheckDetails() {
    this.router.navigate(['project_details', this.id]);
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

}
