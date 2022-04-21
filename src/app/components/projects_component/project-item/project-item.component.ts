import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/api-service/api-service.service';
import { Project } from '../project.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  @Input() project_item: Project;
  @Input() index: number;

  /*  @Output() projectSelected = new EventEmitter(); */
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    /* this.apiService.getProjects().subscribe(api_data => this.project_item = api_data); */
  }

  onProjectSelected() {
    this.router.navigate(['project_details', this.project_item.id], { relativeTo: this.route });
    console.log(this.project_item.id)
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  /*  onSelected() {
     this.projectSelected.emit();
   } */

}
