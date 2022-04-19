import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//http
import { HttpClientModule } from '@angular/common/http';

//components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProjectComponent } from './components/projects_component/project/project.component';
import { ProjectDetailsComponent } from './components/projects_component/project-details/project-details.component';

//graph imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

//sidebar

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProjectComponent,
    ProjectDetailsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    //graphs
    BrowserAnimationsModule,
    NgxChartsModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
