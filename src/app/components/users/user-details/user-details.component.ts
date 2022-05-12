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

  public projects: Project[];
  public projectIds = [];
  public userProjectIds = [];
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

          projects.forEach(element => {

            this.sub = this.apiService.getProjectMembers(element.id)
              .subscribe(
                (members: User[]) => {

                  members.forEach(el => {
                    if (el.id == this.user_id) {
                      this.userProjectIds.push(element)
                      console.log("uPId: ", this.userProjectIds);
                    }
                  });
                }
              );

          });
        }
      );

    console.log("uPId FORA: ", this.userProjectIds);


  }

  /* async getProjectIdList(projects) {
    projects.forEach(element => {

      //this.projectIds.push(element.id);
      //console.log("uPId: ", element);
      this.sub = this.apiService.getProjectMembers(element.id)
        .subscribe(
          (members: User[]) => {

            members.forEach(el => {
              if (el.id == this.user_id) {
                //uPId.push(element)
                //console.log("uPId: ", uPId);
              }
            });
          }
        );

      //console.log("Teste: ", element);
    });

    this.userProjectIds = this.getUserProjects(this.projectIds);
    //console.log("IDS O: ", this.userProjectIds);
  }

  getUserProjects(projectIds) {

    let uPId = [];

    projectIds.forEach(element => {

      this.sub = this.apiService.getProjectMembers(element)
        .subscribe(
          (members: User[]) => {

            members.forEach(el => {
              if (el.id == this.user_id) {
                uPId.push(element)
                //console.log("uPId: ", uPId);
              }
            });
          }
        );
    });
    //console.log("IDS I: ", uPId);
    return uPId;
  } */

  /* getProjects(projIds) {
    console.log("ELEMENTO: ", projIds);



     for (let i = 0; i < projIds.length; i++) {
      //console.log("ELEMENT: ", projIds[i]);
    } 

     projIds.forEach(element => {
      console.log("ELEMENT: ", element);
      this.sub = this.apiService.getProjectById(element)
        .subscribe(
          (proj: Project[]) => {

            console.log("PROJECTS: ", proj);
            //this.userProjectList.push(proj);
          }
        );
    }); 

    //console.log(this.userProjectList);
  } */

}

// Get projects
// foreach projects/members if user_id exists, push to userProjects array