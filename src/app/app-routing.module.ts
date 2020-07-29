import { CountriesComponent } from './component/countries/countries.component';
import { HomeComponentComponent } from './component/home-component/home-component.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'',component: HomeComponentComponent
},
{
  path:'countries', component : CountriesComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
