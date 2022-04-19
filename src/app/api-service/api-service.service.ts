import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproject, Iproject_details } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private auth_token: string = "_XWZ5tg8JMenFWpRVsXD";
  //private projeurl: string = 'http://10.0.0.253:8181/api/v4/projects';
  private project_id: string = '122';

  constructor(private http: HttpClient) { }

  public getProjects(): Observable<Iproject[]> {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }

    return this.http.get<Iproject[]>('http://10.0.0.253:8181/api/v4/projects', { headers: headers });
  }

  public getProjectsDetails(): Observable<Iproject_details[]> {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.auth_token}`
    }


    return this.http.get<Iproject_details[]>(`http://10.0.0.253:8181/api/v4/projects/${this.project_id}/labels`, { headers: headers });
  }

}
