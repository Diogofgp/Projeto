import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//http
import { HttpClientModule } from '@angular/common/http';

//components
import { AppComponent } from './app.component';
import { NgxGraphComponent } from './ngx-graph/ngx-graph.component';
import { ApiDataComponent } from './api-data/api-data.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component'

//graph imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

/*import { HeatMapChartComponent } from './heat-map-chart/heat-map-chart.component';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';
import { PolarRadarChartComponent } from './polar-radar-chart/polar-radar-chart.component';
import { LinearGaugeChartComponent } from './linear-gauge-chart/linear-gauge-chart.component';
import { NumberCardChartComponent } from './number-card-chart/number-card-chart.component';
import { TreeMapChartComponent } from './tree-map-chart/tree-map-chart.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { ProductBarChartsComponent } from './product-bar-charts/product-bar-charts.component';
import { ProductPieChartsComponent } from './product-pie-charts/product-pie-charts.component';
import { ProductAreaLineChartsComponent } from './product-area-line-charts/product-area-line-charts.component';*/


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NgxGraphComponent,
    ApiDataComponent,
    DashboardComponent

    //SidebarComponent

    /*HeatMapChartComponent,
    GaugeChartComponent,
    PolarRadarChartComponent,
    LinearGaugeChartComponent,
    NumberCardChartComponent,
    TreeMapChartComponent,
    BubbleChartComponent,
    ProductBarChartsComponent,
    ProductPieChartsComponent,
    ProductAreaLineChartsComponent*/
  ],
  imports: [
    BrowserModule,
    NgbModule,
    //graphs
    BrowserAnimationsModule,
    NgxChartsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
