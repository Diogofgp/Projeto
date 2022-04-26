import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api-service/api-service.service';
import { Project } from '../project.model';
import { Subscription } from 'rxjs';
import { Issue } from '../issues.model';
import { Label } from '../labels.model';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  id: number;
  projectId: Project;

  sub: Subscription;

  public issuesList = [];
  public labelsList = [];

  public project;

  totalIssues = 0;
  totalTimeSpent = 0;
  users = [];
  labelnames = [];

  mapValues: Map<string, number> = new Map();

  labelPieChart: any = [];

  labelColorList = [];

  /*  barColors = [
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
  */
  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router) { Chart.register(...registerables) }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.projectId = this.apiService.getProjectId(this.id);

        }
      );

    this.sub = this.apiService.getProjectById(this.id)
      .subscribe(
        (proj: Project[]) => {
          this.project = proj;
        }
      );

    this.sub = this.apiService.getLabels(this.id)
      .subscribe(
        (labels: Label[]) => {
          this.labelsList = labels;
          //console.log("LABELS: ", this.labelsList);
          this.getLabelInfo(this.labelsList)
        }
      );

    this.sub = this.apiService.getIssues(this.id)
      .subscribe(
        (issues: Issue[]) => {
          this.issuesList = issues;
          this.getIssueInfo(this.issuesList)
        }
      );

  }

  async getLabelInfo(labels) {
    for (let i = 0; i < labels.length; i++) {
      this.labelnames.push(labels[i].name);
      this.labelColorList.push(labels[i].color)
    }
    //console.log("LABELS: ", this.labelColorList);
  }

  async getIssueInfo(issues) {
    this.totalIssues = issues.length;

    for (let i = 0; i < issues.length; i++) {
      this.totalTimeSpent = this.totalTimeSpent + issues[i].time_stats.total_time_spent;
      if (issues[i].assignee || issues[i].assignee != null) {
        this.users.push(issues[i].assignee.username);
      }
      //console.log(issues[i].labels[0]);
    }

    this.totalTimeSpent = this.totalTimeSpent / 3600;


    for (let j = 0; j < this.labelnames.length; j++) {

      let count = 0;

      for (let i = 0; i < issues.length; i++) {
        if (this.labelnames[j] == issues[i].labels[0]) {
          count++;
        }
      }
      //console.log("COUNT ", this.labelnames[j], " : ", count);
      this.mapValues.set(this.labelnames[j], count);
    }

    this.labelChart();

    //console.log("MAP: ", this.mapValues);
    //console.log("TESTE: ", this.testevalues);
    //console.log("LABELS: ", this.labelnames);
    //console.log("ISSUES: ", issues);
  }

  labelChart() {

    let values = Array.from(this.mapValues.values());
    let keys = [...this.mapValues.keys()];
    //console.log("MAP: ", this.mapValues);
    //console.log("KEYS: ", keys);
    //console.log("VALUES: ", values);
    //console.log("LABEL COLORS: ", this.labelColorList);

    //PIE CHART

    this.labelPieChart = new Chart('labelchart', {
      type: 'pie',
      data: {
        labels: keys,
        datasets: [
          {
            label: 'Label',
            data: values,
            borderWidth: 0,
            backgroundColor: this.labelColorList,
            borderColor: '#3e95cd',
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Project Labels',

          },
          legend: {
            display: true,
            position: 'left',

          }
        }
      }
    });

  }

  onCheckDetails() {
    this.router.navigate(['project_details', this.id]);
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  getProjectDetails() {
    //console.log(this.apiService.getProjectById(this.id));
    return this.apiService.getProjectById(this.id);
  }

}
