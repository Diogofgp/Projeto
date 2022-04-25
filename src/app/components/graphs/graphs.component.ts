import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/services/api-service/api-service.service';
import { LoadingService } from 'src/app/services/loading';
import { Project } from '../projects_component/project.model';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  //SUPPPPP

  //chart vars
  idProj: any;
  nameProj: any;
  issuesProj: any;
  starcountProj: any;
  pieChart: any = []
  barChart: any = []

  subscription: Subscription;
  public projectList = [];

  // added progress spinner
  loading$ = this.loader.loading$;


  constructor(private apiService: ApiService, public loader: LoadingService) { Chart.register(...registerables) }

  ngOnInit() {
    this.subscription = this.apiService.getProjects()
      .subscribe(
        (projectList: Project[]) => {
          this.projectList = projectList;
          console.log(projectList);
          this.idProj = this.projectList.map((proj: any) => proj.id)
          this.nameProj = this.projectList.map((proj: any) => proj.name)
          this.issuesProj = this.projectList.map((proj: any) => proj.open_issues_count)
          this.starcountProj = this.projectList.map((proj: any) => proj.star_count)

          //PIE CHART

          this.pieChart = new Chart('piecanvas', {
            type: 'pie',
            data: {
              labels: this.nameProj,
              datasets: [
                {
                  label: 'IDs',
                  data: this.issuesProj,
                  borderWidth: 3,
                  backgroundColor: 'rgba(93, 175, 89, 0.1)',
                  borderColor: '#3e95cd',
                },
              ],
            },
          });

          //BAR CHART

          this.barChart = new Chart('barcanvas', {
            type: 'bar',
            data: {
              labels: this.nameProj,
              datasets: [
                {
                  label: 'StarCount',
                  data: this.starcountProj,
                  borderWidth: 3,
                  backgroundColor: 'rgba(93, 175, 89, 0.1)',
                  borderColor: '#3e95cd',
                },
              ],
            },
          });

        }
      );

  }




}
