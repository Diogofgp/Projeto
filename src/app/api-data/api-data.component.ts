import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Project } from './api.model';

@Component({
  selector: 'app-api-data',
  templateUrl: './api-data.component.html',
  styleUrls: ['./api-data.component.css']
})
export class ApiDataComponent implements OnInit {
  //totalAngularPackages: any;
  auth_token: string = "_XWZ5tg8JMenFWpRVsXD";
  get_projects: string = 'http://10.0.0.253:8181/api/v4/projects';

  projects: Project[] = [
    /* new Project(1, 'name test', 'blah blah blah'),
    new Project(2, 'name test2', '2nd project') */
  ];


  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchProjects();
  }

  private fetchProjects() {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }

    this.http.get
      (this.get_projects, { headers: headers })
      .pipe(map((responseData: { (key: string) }) => {
        const getArray = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            getArray.push({ ...responseData[key], id: key })
          }
        }
        console.log(getArray);
        return getArray;
      }))
      .subscribe(projs => {
        console.log(projs);

        this.projects = projs;
        //next: data => this.totalAngularPackages = data.total,
        //error: error => console.error("Error", error)
      })
  }
}

