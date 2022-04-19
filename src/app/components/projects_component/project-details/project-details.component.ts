import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api-service/api-service.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  public project_details = <any>[];
  elem1: number = 0;
  elem2: number = 0;
  //public productsArray: Product[];

  constructor(private apiService: ApiService) { }

  /* public checkId(){
    this.project_details.forEach(this.elem1, function(value1, key1) {
      Project.forEach(this.elem2, function(value2, key2) {
          if (value1.id == value2.id) {
              // here is where you grab the value2.color
          }
      });
  });
  } */

  ngOnInit() {
    this.apiService.getProjectsDetails().subscribe(data => this.project_details = data);
  }

}
