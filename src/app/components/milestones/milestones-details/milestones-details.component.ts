import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Milestone } from 'src/app/models/milestones.model';
import { ApiService } from 'src/app/services/api-service/api-service.service';

@Component({
  selector: 'app-milestones-details',
  templateUrl: './milestones-details.component.html',
  styleUrls: ['./milestones-details.component.css']
})
export class MilestonesDetailsComponent implements OnInit {


  milestone_id: number;
  id: number;
  sub: Subscription;

  public milestoneList = <any>[];

  constructor(private apiService: ApiService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params: Params) => {

          this.id = +params['id'];
          this.milestone_id = +params['milestone_id'];
        }
      );

    this.sub = this.apiService.getMilestones(this.id)
      .subscribe(
        (m: Milestone[]) => {

          this.milestoneList = m;
        }
      );

  }

}
