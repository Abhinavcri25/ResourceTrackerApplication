import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormcompComponent } from './formcomp/formcomp.component';
import { DetailsComponent } from './details/details.component';
import { KendoComponentComponent } from './kendo-component/kendo-component.component';
import { HometableComponent } from './hometable/hometable.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DropdownformComponent } from './dropdownform/dropdownform.component';
export const routes: Routes = [
//   { path: '', component: AppComponent }, // main page with table
  { path: 'form', component: DropdownformComponent },
  {path: 'details/:id',component: DetailsComponent},
  {path: 'kendo',component: KendoComponentComponent},
  {path: 'form/:id',component: DropdownformComponent},
  {path: '',component: DashboardComponent}
];

