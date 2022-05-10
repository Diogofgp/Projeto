import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Milestone } from 'src/app/models/milestones.model';
import { ApiService } from 'src/app/services/api-service/api-service.service';
import { LoadingService } from 'src/app/services/loading';

@Component({
  selector: 'app-milestones-details',
  templateUrl: './milestones-details.component.html',
  styleUrls: ['./milestones-details.component.css']
})
export class MilestonesDetailsComponent implements OnInit {

  milestone_id: number;
  id: number;
  sub: Subscription;
  loading$ = this.loader.loading$;

  //public milestone = <any>[];
  public milestoneIssues = <any>[];
  milestoneList: Milestone[];

  constructor(private apiService: ApiService,
    private route: ActivatedRoute, public loader: LoadingService) { }

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

    // var num = this.milestone_iid - 1;
    //console.log(num + "num value");

    console.log(this.milestone_id)
    this.sub = this.apiService.getIssuesByMilestone(this.id, this.milestone_id)
      .subscribe(
        (k: Milestone[]) => {

          this.milestoneIssues = k;
          console.log(this.milestoneIssues + "info")
          //console.log(this.milestone)
        }
      );

  }

}
