import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project.model';
import { User } from 'src/app/models/users.model';
import { ApiService } from 'src/app/services/api-service/api-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  user_id: number;
  sub: Subscription;

  public projects = <any>[];
  public projectIds = <any>[];
  public userProjectIds = <any>[];
  public userProjectList: Project[];
  public starredProjects: User[];
  public projectsOwned: User[];


  constructor(private apiService: ApiService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (params: Params) => {

          this.user_id = +params['user_id'];
        }
      );

    //console.log("USER ID:", this.user_id)

    this.sub = this.apiService.getProjects()
      .subscribe(
        (projects: Project[]) => {
          this.projects = projects;
          //console.log(projects);
          //this.getProjectIdList(this.projects);
        }
      );

    this.sub = this.apiService.getUserStarredProjects(this.user_id)
      .subscribe(
        (kek: User[]) => {
          this.starredProjects = kek;
          console.log(this.starredProjects)
        }
      );

    this.sub = this.apiService.getUserProjectsOwned(this.user_id)
      .subscribe(
        (kek: User[]) => {
          this.projectsOwned = kek;
          console.log(this.projectsOwned)
        }
      );


  }

  /* async getProjectIdList(projects) {
    projects.forEach(element => {
      //console.log(element.id);
      this.projectIds.push(element.id)
    });
    await this.getUserProjects(this.projectIds);
  } */

  /*  async getUserProjects(projectIds) {
 
     projectIds.forEach(element => {
 
       this.sub = this.apiService.getProjectMembers(element)
         .subscribe(
           (members: Project[]) => {
             members.forEach(el => {
               if (el.id == this.user_id) {
                 this.userProjectIds.push(element)
                 console.log("E ", element);
                 //console.log("A ", this.userProjectList);
               }
             });
           }
         );
     });
 
     await this.getProjects(this.userProjectIds)
 
   } */

  /* getProjects(projIds) {
    console.log("ELEMENT: ", projIds);

     for (let i = 0; i < projIds.length; i++) {
      //console.log("ELEMENT: ", projIds[i]);
    } 

    /* projIds.forEach(element => {
      console.log("ELEMENT: ", element);
      this.sub = this.apiService.getProjectById(element)
        .subscribe(
          (proj: Project[]) => {

            console.log("PROJECTS: ", proj);
            //this.userProjectList.push(proj);
          }
        );
    }); 

  } */

}

// Get projects
// foreach projects/members if user_id exists, push to userProjects array