import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Project } from '../project.model';
import { ApiService } from '../../../api-service/api-service.service';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  @Output() projectWasSelected = new EventEmitter<Project>();

  public projectList = [];
  subscription: Subscription;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.subscription = this.apiService.getProjects()
      .subscribe(
        (projectList: Project[]) => {
          this.projectList = projectList;
          /*  console.log(projectList); */
        }
      );

    //this.apiService.getProjects().subscribe(api_data => this.projectList = api_data);
    /* console.log(+ this.projects); */
  }

  onProjectSelected(project_item: Project) {
    this.projectWasSelected.emit(project_item);
  }


}
