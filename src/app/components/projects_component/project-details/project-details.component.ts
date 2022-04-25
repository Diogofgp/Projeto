import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api-service.service';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  id: number;
  project: Project;

  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.project = this.apiService.getProjectId(this.id);
        }
      );
  }
  /* 
    onCheckDetails() {
      this.router.navigate(['project_details', this.id]);
    } */

  /* getProjectDetails() {
    console.log(this.apiService.getProjectById(this.id));
    return this.apiService.getProjectById(this.id);
  } */

}
