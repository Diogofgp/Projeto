import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Milestone } from 'src/app/models/milestones.model';
import { ApiService } from 'src/app/services/api-service/api-service.service';
import { LoadingService } from 'src/app/services/loading';

@Component({
  selector: 'app-milestones-list',
  templateUrl: './milestones-list.component.html',
  styleUrls: ['./milestones-list.component.css']
})
export class MilestonesListComponent implements OnInit {

  @Output() milestoneWasSelected = new EventEmitter<Milestone>();

  public projectList = [];
  sub: Subscription;
  id: number;
  public milestoneList = <any>[];

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

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
          console.log(m)
          this.milestoneList = m;
        }
      );


  }

}
