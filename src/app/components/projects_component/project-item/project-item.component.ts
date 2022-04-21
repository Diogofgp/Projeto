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
export class ProjectItemComponent implements OnInit {
  @Input() project_item: Project;
  @Input() index: number;

  /*  @Output() projectSelected = new EventEmitter(); */

  constructor(private router: Router) { }

  ngOnInit() { }

  onProjectSelected() {
    /*   console.log(this.index) */
    this.router.navigate([this.project_item.id, 'project_details',]);
    /* console.log(this.project_item.id) */
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  /*  onSelected() {
     this.projectSelected.emit();
   } */

}
