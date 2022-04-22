import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api-service/api-service.service';
import { Project } from '../projects_component/project.model';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  //Chart Colours

  barColors = [
    "#b91d47",
    "#00aba9",
    "#2b5797",
    "#e8c3b9",
    "#1e7145",
    "#592E83",
    "#FBC740",
    "#66D2D6",
    "#F51720",
    "#0000FF",
    "#000C66",
    "#68BBE3",
    "#81B622",
    "#59981A",
    "#DBA40E"
  ];

  //Chart Vars
  idProj: any;
  nameProj: any;
  issuesProj: any;
  starcountProj: any;
  pieChart: any = []
  barChart: any = []
  radarChart: any = []

  subscription: Subscription;
  public projectList = [];

  constructor(private apiService: ApiService) { Chart.register(...registerables) }

  ngOnInit() {
    this.subscription = this.apiService.getProjects()
      .subscribe(
        (projectList: Project[]) => {
          this.projectList = projectList;
          //console.log(projectList);
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
                  borderWidth: 0,
                  backgroundColor: this.barColors,
                  borderColor: '#3e95cd',
                },
              ],
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Project IDs',

                },
                legend: {
                  display: true,
                  position: 'right',

                }
              }
            }
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
                  borderWidth: 0,
                  backgroundColor: this.barColors,
                  borderColor: '#3e95cd',
                },
              ],
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Project Stars',

                },
                legend: {
                  display: false,
                  position: 'right',

                }
              }
            }
          });

          //RADAR CHART

          this.radarChart = new Chart('radarcanvas', {
            type: 'radar',
            data: {
              labels: this.nameProj,
              datasets: [
                {
                  label: 'StarCount',
                  data: this.starcountProj,
                  borderWidth: 0,
                  backgroundColor: this.barColors,
                  borderColor: '#3e95cd',
                },
              ],
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Project Stars',

                },
                legend: {
                  display: false,
                  position: 'right',

                }
              }
            }
          });



        }
      );

  }




}
