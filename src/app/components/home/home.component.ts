import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ProjectListComponent } from '../projects_component/project-list/project-list.component';
import { Project } from '../projects_component/project.model';
import { ApiService } from 'src/app/services/api-service/api-service.service';
import { Observable, of, Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  /*  @Output() total = new EventEmitter(); */
  /* @ViewChild('comp1') comp1: ProjectListComponent; */

  public projectList = [];
  private subscription: Subscription;
  cards = new Observable;

  loading$ = this.loader.loading$;

  constructor(private breakpointObserver: BreakpointObserver, private apiService: ApiService, public loader: LoadingService) { }

  ngOnInit() {

    this.subscription = this.apiService.getProjects()
      .subscribe(
        (projectList: Project[]) => {
          this.projectList = projectList;
          console.log(this.projectList.length)

          this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
            map(({ matches }) => {
              if (matches) {
                //if resolution is lower, adjustments
                return [
                  { title: 'Total Projects', cont: this.projectList.length, cols: 1, rows: 1 },
                  { title: 'Card 2', cont: 'bruh', cols: 1, rows: 1 },
                  { title: 'Card 3', cont: 'imagina', cols: 1, rows: 1 },
                  { title: 'Card 4', cont: 'ligma', cols: 1, rows: 1 }
                ];
              }

              return [
                { title: 'Total Projects', cont: this.projectList.length, cols: 1, rows: 1 },
                { title: 'Card 2', cont: 'bruh', cols: 1, rows: 1 },
                { title: 'Card 3', cont: 'imagina', cols: 1, rows: 1 },
                { title: 'Card 4', cont: 'ligma', cols: 1, rows: 1 }
              ];
            })
          );

        }
      );
  }



  /*  getTotalProjects() {
     this.subscription = this.apiService.getProjects()
       .subscribe(
         (projectList: Project[]) => {
           this.projectList = projectList;
         }
       );
     this.total = this.projectList.length
     return this.total;
   } */

  /* getCards() {
    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {
          //if resolution is lower, adjustments
          return [
            { title: 'Total Projects', cont: this.getTotalProjects(), cols: 1, rows: 1 },
            { title: 'Card 2', cont: 'bruh', cols: 1, rows: 1 },
            { title: 'Card 3', cont: 'imagina', cols: 1, rows: 1 },
            { title: 'Card 4', cont: 'ligma', cols: 1, rows: 1 }
          ];
        }

        return [
          { title: 'Total Projects', cont: this.getTotalProjects(), cols: 1, rows: 1 },
          { title: 'Card 2', cont: 'bruh', cols: 1, rows: 1 },
          { title: 'Card 3', cont: 'imagina', cols: 1, rows: 1 },
          { title: 'Card 4', cont: 'ligma', cols: 1, rows: 1 }
        ];
      })
    );
  } */

  /* cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        //if resolution is lower, adjustments
        return [
          { title: 'Total Projects', cont: this.getTotalProjects(), cols: 1, rows: 1 },
          { title: 'Card 2', cont: 'bruh', cols: 1, rows: 1 },
          { title: 'Card 3', cont: 'imagina', cols: 1, rows: 1 },
          { title: 'Card 4', cont: 'ligma', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Total Projects', cont: this.getTotalProjects(), cols: 1, rows: 1 },
        { title: 'Card 2', cont: 'bruh', cols: 1, rows: 1 },
        { title: 'Card 3', cont: 'imagina', cols: 1, rows: 1 },
        { title: 'Card 4', cont: 'ligma', cols: 1, rows: 1 }
      ];
    })
  ); */

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
