import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Issue } from 'src/app/models/issues.model';
import { Project } from 'src/app/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private auth_token: string = "_XWZ5tg8JMenFWpRVsXD";
  private url: string = 'http://10.0.0.253:8181/api/v4';
  private projects: Project[] = [];

  constructor(private http: HttpClient) { }

  public getProjects() {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }

    return this.http.get<Project[]>(`${this.url}/projects?per_page=1000`, { headers: headers });
  }

  public getProjectById(index: number) {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }

    return this.http.get<Project[]>(`${this.url}/projects/${index}`, { headers: headers });
  }

  public getUsers() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }

    return this.http.get<any[]>(`${this.url}/users?per_page=1000`, { headers: headers });
  }

  setProjects(projects: Project[]) {
    this.projects = projects;
  }


  getProjectId(index: number) {
    return this.projects[index];
  }

  public getIssues(index: number) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }

    const response = this.http.get<any[]>(`${this.url}/projects/${index}/issues?per_page=1000`, { headers: headers });
    //console.log("TESTE: ", response);
    return response;
  }


  public getLabels(index: number) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }

    return this.http.get<any[]>(`${this.url}/projects/${index}/labels?per_page=1000`, { headers: headers });
  }

  public getMilestones(index: number) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }

    return this.http.get<any[]>(`${this.url}/projects/${index}/milestones?per_page=1000`, { headers: headers });
  }


  /* public getProjectsDetails(): Observable<Project> {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }


    return this.http.get<Project>(`http://10.0.0.253:8181/api/v4/projects/${this.project_id}/labels`, { headers: headers });
  } */

}
