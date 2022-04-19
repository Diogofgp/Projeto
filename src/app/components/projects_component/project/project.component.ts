import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../api-service/api-service.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  public projects = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getProjects().subscribe(api_data => this.projects = api_data);
  }
}
