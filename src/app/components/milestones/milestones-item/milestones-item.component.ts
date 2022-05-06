import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Milestone } from 'src/app/models/milestones.model';
import { ApiService } from 'src/app/services/api-service/api-service.service';

@Component({
  selector: 'app-milestones-item',
  templateUrl: './milestones-item.component.html',
  styleUrls: ['./milestones-item.component.css']
})
export class MilestonesItemComponent implements OnInit {


  @Input() milestone_item: Milestone;
  /*   @Input() project_item: Project; */
  @Input() index: number;
  /*  @Input() index2: number; */

  id: number;
  sub: Subscription;
  public milestone = <any>[];

  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
        }
      );

    this.sub = this.apiService.getMilestones(this.id)
      .subscribe(
        (m: Milestone[]) => {

          this.milestone = m;
        }
      );
  }


  onMilestoneSelected() {

    /*   console.log(this.milestone_item.iid); */
    this.router.navigate(['project_details', this.id, 'milestone_details', this.milestone_item.id]);
  }
}
