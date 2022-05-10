import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Issue } from 'src/app/models/issues.model';
import { Milestone } from 'src/app/models/milestones.model';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/users.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private auth_token: string = "_XWZ5tg8JMenFWpRVsXD";
  private url: string = 'http://10.0.0.253:8181/api/v4';
  private projects: Project[] = [];
  private milestones: Milestone[] = [];

  constructor(private http: HttpClient) { }


  //PROJECT CALLS

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

  public getProjectMembers(index: number) {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }

    return this.http.get<any[]>(`${this.url}/projects/${index}/members`, { headers: headers });
  }

  //USER CALLS

  public getUsers() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }

    return this.http.get<any[]>(`${this.url}/users?per_page=1000`, { headers: headers });
  }

  public getUserById(index: number) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }

    return this.http.get<any[]>(`${this.url}/users/${index}`, { headers: headers });
  }

  //ISSUES CALLS

  public getIssuesByProjectId(index: number) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }

    const response = this.http.get<any[]>(`${this.url}/projects/${index}/issues?per_page=1000`, { headers: headers });
    //console.log("TESTE: ", response);
    return response;
  }

  public getIssueDetailsById(index: number, iid: number) {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }

    return this.http.get<Issue[]>(`${this.url}/projects/${index}/issues/${iid}`, { headers: headers });
  }

  public getIssueLinks(index: number, iid: number) {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }

    return this.http.get<Issue[]>(`${this.url}/projects/${index}/issues/${iid}/links`, { headers: headers });
  }

  //LABEL CALLS

  public getLabels(index: number) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }

    return this.http.get<any[]>(`${this.url}/projects/${index}/labels?per_page=1000`, { headers: headers });
  }

  //MILESTONE CALLS

  public getMilestones(index: number) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }

    return this.http.get<any[]>(`${this.url}/projects/${index}/milestones?per_page=1000`, { headers: headers });
  }

  public getIssuesByMilestone(index: number, id: number) {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }

    return this.http.get<Milestone[]>(`${this.url}/projects/${index}/milestones/${id}/issues`, { headers: headers });
  }

  setProjects(projects: Project[]) {
    this.projects = projects;
  }

  getProjectId(index: number) {
    return this.projects[index];
  }


}
