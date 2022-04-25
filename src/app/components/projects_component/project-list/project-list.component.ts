import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../project.model';
import { ApiService } from 'src/app/services/api-service/api-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  @Output() projectWasSelected = new EventEmitter<Project>();
  @Input() totalProjs: number;

  public projectList = [];
  subscription: Subscription;
  loading$ = this.loader.loading$;

  constructor(private apiService: ApiService, public loader: LoadingService) { }

  ngOnInit() {
    this.subscription = this.apiService.getProjects()
      .subscribe(
        (projectList: Project[]) => {
          this.projectList = projectList;
        }
      );
  }

  /*  public getTotal() {
 
     this.projectList.forEach(function (value) {
       this.totalProjs++;
     });
     return this.totalProjs;
   } */


}
