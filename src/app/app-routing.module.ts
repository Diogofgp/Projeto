import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphsComponent } from './components/graphs/graphs.component';
import { HomeComponent } from './components/home/home.component';
import { IssueDetailsComponent } from './components/issues/issue-details/issue-details.component';
import { IssuesComponent } from './components/issues/issues.component';
import { ProjectDetailsComponent } from './components/projects_component/project-details/project-details.component';
import { ProjectsComponent } from './components/projects_component/projects.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'projects',
    component: ProjectsComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'graphs',
    component: GraphsComponent,
  },

  {
    path: 'project_details/:id', component: ProjectDetailsComponent,

    children: [
      /*  {
         path: ':id', // child route path
         component: ProjectDetailsComponent, // child route component that the router renders
       }, */
      /*   {
          path: 'issue_details/:issue_id',
          component: IssueDetailsComponent,
        } */

    ],
  },
  { path: 'project_details/:id/issue_details/:issue_id', component: IssueDetailsComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
