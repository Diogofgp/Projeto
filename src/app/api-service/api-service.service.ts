import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproject, Iproject_details } from '../interfaces';
import { Project } from '../components/projects_component/project.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private auth_token: string = "_XWZ5tg8JMenFWpRVsXD";
  //private projeurl: string = 'http://10.0.0.253:8181/api/v4/projects';

  private projects: Project[] = [];

  constructor(private http: HttpClient) { }

  public getProjects() {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }

    return this.http.get<Project[]>('http://10.0.0.253:8181/api/v4/projects', { headers: headers });
  }


  setProjects(projects: Project[]) {
    this.projects = projects;
  }

  getSingleProject(index: number) {
    return this.projects[index];
  }



  /* public getProjectsDetails(): Observable<Project> {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }


    return this.http.get<Project>(`http://10.0.0.253:8181/api/v4/projects/${this.project_id}/labels`, { headers: headers });
  } */

}
