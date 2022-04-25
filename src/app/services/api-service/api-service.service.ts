import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from 'src/app/components/projects_component/project.model';

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

    return this.http.get<Project[]>(`${this.url}/projects`, { headers: headers });
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

    return this.http.get<any[]>(`${this.url}/users`, { headers: headers });
  }

  setProjects(projects: Project[]) {
    this.projects = projects;
  }


  getProjectId(index: number) {
    return this.projects[index];
  }

}
