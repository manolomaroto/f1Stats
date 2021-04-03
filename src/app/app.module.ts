import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CurrentDriversComponent } from './components/current-drivers/current-drivers.component';
import { CurrentConstructorsComponent } from './components/current-constructors/current-constructors.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CurrentDriversComponent,
    CurrentConstructorsComponent
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
