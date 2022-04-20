import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/api-service/api-service.service';
import { Project } from 'src/app/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() project_item: Project;
  @Output() projectSelected = new EventEmitter();

  subscription: Subscription;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    /* this.apiService.getProjects().subscribe(api_data => this.project_item = api_data); */
  }

  onSelected() {
    this.projectSelected.emit();
  }

}
