import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Milestone } from 'src/app/models/milestones.model';
import { Project } from 'src/app/models/project.model';
import { ApiService } from 'src/app/services/api-service/api-service.service';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.css']
})
export class MilestonesComponent implements OnInit {


  selectedMilestone: Milestone;

  constructor() { }

  ngOnInit(): void {

  }

}
