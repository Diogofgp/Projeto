import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Project } from '../../models/project.model';
import { ApiService } from 'src/app/services/api-service/api-service.service';
import { Observable, of, Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading';
import { User } from '../users/users.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  /*  @Output() total = new EventEmitter(); */
  /* @ViewChild('comp1') comp1: ProjectListComponent; */

  public projectList = [];
  public users = [];
  private sub: Subscription;
  cards = new Observable;

  //loading spinner
  loading$ = this.loader.loading$;

  constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService, public loader: LoadingService) { }

  ngOnInit() {

    this.sub = this.apiService.getProjects()
      .subscribe(
        (proj: Project[]) => {
          this.projectList = proj;


          this.sub = this.apiService.getUsers()
            .subscribe(
              (u: User[]) => {
                this.users = u;

                this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
                  map(({ matches }) => {
                    if (matches) {
                      //if resolution is lower, adjustments
                      return [
                        { title: 'Dashboard info', cont: "info", cols: 2, rows: 1 },
                        { title: 'Total Projects', subtitle: "Projects", cont: this.projectList.length, image: '../../../assets/project_stats.png', cols: 1, rows: 1 },
                        { title: 'Card 3', cont: 'test', cols: 1, rows: 2 },
                        { title: 'Total Users', subtitle: "Users", cont: this.users.length, image: '../../../assets/auditor.png', cols: 1, rows: 1 }
                      ];
                    }

                    return [
                      { title: 'Dashboard info', cont: "info", cols: 2, rows: 1 },
                      { title: 'Total Projects', subtitle: "Projects", cont: this.projectList.length, image: '../../../assets/project_stats.png', cols: 1, rows: 1 },
                      { title: 'Card 3', cont: 'test', cols: 1, rows: 2 },
                      { title: 'Total Users', subtitle: "Users", cont: this.users.length, image: '../../../assets/auditor.png', cols: 1, rows: 1 }
                    ];
                  })
                );
              }
            );
        }
      );
  }




  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
