import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { CreateCustomersComponent } from './pages/customers/create-customers/create-customers.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { OptionsRegisterComponent } from './pages/register/options-register/options-register.component';
import { RegisterComponent } from './pages/register/register.component';
import { CreateSalesComponent } from './pages/sales/create-sales/create-sales.component';
import { SalesComponent } from './pages/sales/sales.component';

const routes: Routes = [
  //Login and registers
  {path:"login",component: LoginComponent},
  {path:"register/SalesManager",component: RegisterComponent},
  {path:"register/ProjectManager",component: RegisterComponent},
  {path:"register/EngineeringChief",component: RegisterComponent},
  {path:"register-option",component: OptionsRegisterComponent},
  
  //Sections
  {path:"home",component: HomeComponent},
  {path:"customers",component: CustomersComponent},
  {path:"sales",component: SalesComponent},
  {path:"activities",component: ActivitiesComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
