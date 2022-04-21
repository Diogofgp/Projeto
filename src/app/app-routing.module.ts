import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphsComponent } from './components/graphs/graphs.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectDetailsComponent } from './components/projects_component/project-item/project-item.component';
import { ProjectListComponent } from './components/projects_component/project-list/project-list.component';
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
    children: [
      { path: '', component: ProjectsComponent },
      { path: ':id', component: ProjectDetailsComponent },
    ],

  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'graphs',
    component: GraphsComponent,
  },
  { path: ':id', component: ProjectDetailsComponent },
  /* {
    path: '**',
    component: NotFoundComponent,
  }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
