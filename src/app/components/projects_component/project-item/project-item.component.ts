import { Component, OnInit, Input, } from '@angular/core';
import { Project } from '../../../models/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {
  @Input() project_item: Project;
  @Input() index: number;

  constructor(private router: Router) { }

  ngOnInit() { }

  onProjectSelected() {
    this.router.navigate([this.project_item.id, 'project_details']);
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  /*  onSelected() {
     this.projectSelected.emit();
   } */

}
