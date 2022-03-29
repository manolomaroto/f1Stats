import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CurrentDriversComponent } from './components/current-drivers/current-drivers.component';
import { CurrentConstructorsComponent } from './components/current-constructors/current-constructors.component';
import { BarChartComponent } from './shared/bar-chart/bar-chart.component';
import { PruebasComponent } from './components/shared/pruebas/pruebas.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CurrentDriversComponent,
    CurrentConstructorsComponent,
    BarChartComponent,
    PruebasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
