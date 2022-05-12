import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { Issue } from 'src/app/models/issues.model';
import { Project } from 'src/app/models/project.model';
import { ApiService } from 'src/app/services/api-service/api-service.service';
import ChartjsPluginStacked100 from "chartjs-plugin-stacked100";

@Component({
  selector: 'app-issue-details',
  templateUrl: './issue-details.component.html',
  styleUrls: ['./issue-details.component.css']
})
export class IssueDetailsComponent implements OnInit {

  issue_id: number;
  id: number;
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  public issueList = <any>[];
  public project = <any>[];
  public macroIssues = <any>[];
  public totalTimeSpentSecs = 0;
  public totalTimeSpent;
  public timeEstimate: string;
  public percentage: number;

  barChart: any = []

  constructor(private apiService: ApiService,
    private route: ActivatedRoute) { Chart.register(...registerables, ChartjsPluginStacked100) }

  ngOnInit(): void {

    /* console.log(this.id)
    console.log(this.issue_id) */

    this.route.params
      .subscribe(
        (params: Params) => {

          this.id = +params['id'];
          this.issue_id = +params['issue_id'];
        }
      );

    /* console.log(this.id)
    console.log(this.issue_id) */

    this.sub1 = this.apiService.getProjectById(this.id)
      .subscribe(
        (proj: Project[]) => {
          this.project = proj;

          this.sub2 = this.apiService.getIssueDetailsById(this.id, this.issue_id)
            .subscribe(
              (issue: Issue[]) => {

                this.issueList = issue;
                this.timeEstimate = this.time_convert(this.issueList.time_stats.time_estimate);

                this.sub3 = this.apiService.getIssueLinks(this.id, this.issue_id)
                  .subscribe(
                    (macro: Issue[]) => {

                      this.macroIssues = macro;

                      console.log("IL : ", this.issueList);
                      let timeEstimateSecs = this.issueList.time_stats.time_estimate

                      console.log("TIME ESTIMATE? : ", this.issueList.time_stats.time_estimate);

                      this.percentage = this.getTotalTimeSpent(this.macroIssues, timeEstimateSecs);
                      console.log("TESTE : ", this.percentage);

                      this.barChart = new Chart('percentchart', {
                        type: 'bar',
                        data: {
                          labels: ["%"],
                          datasets: [
                            {
                              label: 'Spent',
                              data: [this.percentage],
                              backgroundColor: 'rgba(255, 26, 104, 0.2)',
                              borderColor: 'rgba(255, 26, 104, 1)',
                              borderWidth: 1,
                            },
                            {
                              label: 'Available',
                              data: [40],
                              backgroundColor: 'rgba(0, 0, 0, 0.2)',
                              borderColor: 'rgba(0, 0, 0, 1)',
                              borderWidth: 1,
                            },
                          ],
                        },
                        options: {
                          indexAxis: 'y',
                          plugins: {
                            title: {
                              display: true,
                              text: 'Time Used',

                            },
                            legend: {
                              display: false,
                              position: 'right',

                            },
                            stacked100: {
                              enable: true,
                              //replaceTooltipLabel: false,
                              precision: 3,
                            }
                          },
                        }
                      });

                    }
                  );

              }
            );
        }
      );

    //this.percentage = await this.getIL()

    //console.log("TESTE FORA: ", this.percentage);

  }

  /* async getIL() {
    this.sub = (await this.apiService.getIssueLinks(this.id, this.issue_id))
      .subscribe(
        async (macro: Issue[]) => {

          this.macroIssues = macro;

          let timeEstimateSecs = this.issueList.time_stats.time_estimate

          //console.log("TIME ESTIMATE? : ", this.issueList.time_stats.time_estimate);

          this.percentage = await this.getTotalTimeSpent(this.macroIssues, timeEstimateSecs);
          console.log("T : ", this.percentage);
          return Promise.resolve(this.percentage)

          

        }
      );
    return Promise.resolve(0)
  } */


  getTotalTimeSpent(macros, timeEst) {

    macros.forEach(element => {
      this.totalTimeSpentSecs = this.totalTimeSpentSecs + element.time_stats.total_time_spent;
    });

    this.totalTimeSpent = this.time_convert(this.totalTimeSpentSecs);

    let te = timeEst;
    let tu = this.totalTimeSpentSecs;

    //console.log("TE: ", te)
    //console.log("TU: ", tu)

    //this.percentage = (tu * 100 / te).toFixed(3);
    let percentage: number = (tu * 100 / te);

    return percentage

  }

  time_convert(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;

  }

  /* onCheckIssueDetails() {
    this.router.navigate(['project_details', this.id, 'issue_details', this.issue_id]);

  } */

}
