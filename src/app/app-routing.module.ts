import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentConstructorsComponent } from './components/current-constructors/current-constructors.component';
import { CurrentDriversComponent } from './components/current-drivers/current-drivers.component'

const routes: Routes = [
  {path: '', component: CurrentDriversComponent},
  {path: 'currentConstructors', component: CurrentConstructorsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
