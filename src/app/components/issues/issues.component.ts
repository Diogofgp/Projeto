import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { Issue } from 'src/app/models/issues.model';
import { Label } from 'src/app/models/labels.model';
import { MileStones } from 'src/app/models/milestones.model';
import { Project } from 'src/app/models/project.model';
import { ApiService } from 'src/app/services/api-service/api-service.service';



@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent implements OnInit {


  /* UNICO QUE INTERESSA */
  selectedIssue: Issue;
  /* UNICO QUE INTERESSA */


  /* REMOVER */


  id: number;
  projectId: Project;
  sub: Subscription;

  pagenumber: number;

  public issuesList = [];
  public labelsList = [];
  public milestonesList = [];
  public project = <any>[];

  totalIssues: number = 0;
  totalTimeSpent: number = 0;
  users = [];
  labelnames = [];
  totalIssuesOpened: number = 0;
  totalIssuesClosed: number = 0;

  macros = [];

  mapValues: Map<string, number> = new Map();
  mapMacroTime: Map<string, number> = new Map();
  mapIdsForMacros: Map<number, number> = new Map();

  labelPieChart: any = [];

  labelColorList = [];


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

    this.sub = this.apiService.getIssuesByProjectId(this.id)
      .subscribe(
        (issues: Issue[]) => {
          this.issuesList = issues;
          //console.log("ISSUES: ", this.issuesList);
          this.getIssueInfo(this.issuesList);
          this.getMacros(this.issuesList);
          this.getIssueInfo(this.issuesList);
          this.getTotalIssuesOpened();
          this.getTotalIssuesClosed();
        }
      );

    this.sub = this.apiService.getMilestones(this.id)
      .subscribe(
        (milestones: MileStones[]) => {
          this.milestonesList = milestones;
          //console.log("MS: ", this.milestonesList);
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

        if (this.users.indexOf(issues[i].assignee.username)) {
          this.users.push(issues[i].assignee.username);
        }
      }
      //console.log(issues[i].labels[0]);

    }

    this.totalTimeSpent = this.totalTimeSpent / 3600;


    for (let j = 0; j < this.labelnames.length; j++) {

      let count = 0;

      for (let i = 0; i < issues.length; i++) {

        //console.log("QUANTIDADE: ", issues[i].labels.length);

        for (let n = 0; n < issues[i].labels.length; n++) {
          if (this.labelnames[j] == issues[i].labels[n]) {
            count++;
          }
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

  async getMacros(issues) {

    for (let i = 0; i < issues.length; i++) {

      for (let n = 0; n < issues[i].labels.length; n++) {
        if (issues[i].labels[n] == "Macro ♠") {
          this.macros.push(issues[i])
        }
      }
    }
    //console.log("MACROS: ", this.macros);
    this.getMacroLinks(this.macros);
    this.getMacroTimeSum()
  }

  getMacroLinks(macroprojects) {

    macroprojects.forEach(element => {

      let id = element.iid;

      this.sub = this.apiService.getMacroLinks(this.id, element.iid)
        .subscribe(
          (proj: Issue[]) => {
            //console.log("Links: ", proj);

            //this.teste = proj;
            proj.forEach(element => {

              /*  this.mapIdsForMacros.set(element.iid, id); */
            });
          }
        );

    });
    //console.log("TESTE: ", this.teste);
    //console.log("MAP: ", this.mapIdsForMacros);
  }

  getMacroTimeSum() {

    this.mapMacroTime
    //console.log("TESTE: ", this.teste);
    //console.log("Issues: ", this.issuesList);


    /* let values = Array.from(this.mapIdsForMacros.values());
    let keys = [...this.mapIdsForMacros.keys()];
 
 
    console.log("Keys: ", keys);
    console.log("Values: ", values); */

  }


  getTotalIssuesOpened() {

    this.issuesList.forEach(issue => {
      if (issue.state == "opened")
        this.totalIssuesOpened++;
    });
    return this.totalIssuesOpened;
  }

  getTotalIssuesClosed() {

    this.issuesList.forEach(issue => {
      if (issue.state == "closed")
        this.totalIssuesClosed++;
    });
    return this.totalIssuesClosed;
  }

}
