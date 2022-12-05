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
import { InsideSaleComponent } from './pages/sales/inside-sale/inside-sale.component';
import { SalesComponent } from './pages/sales/sales.component';

const routes: Routes = [
  //Login and registers
  {path:"login",component: LoginComponent},
  {path:"register/SalesManager",component: RegisterComponent},
  {path:"register/ProjectManager",component: RegisterComponent},
  {path:"register/EngineeringChief",component: RegisterComponent},
  {path:"register-option",component: OptionsRegisterComponent},
  
  //Sections Project Manager
  {path:"HomeProjectManager/:id",component: HomeComponent},
  {path:"HomeProjectManager/:id/Customers",component: CustomersComponent},
  {path:"HomeProjectManager/:id/Sales",component: SalesComponent},
  {path:"HomeProjectManager/:id/Activities",component: ActivitiesComponent},
  {path:"HomeProjectManager/:id/Sales/:saleid/inside-sale",component: InsideSaleComponent},

  //Sections Sales Manager
  {path:"HomeSalesManager/:id",component: HomeComponent},
  {path:"HomeSalesManager/:id/Customers",component: CustomersComponent},
  {path:"HomeSalesManager/:id/Sales",component: SalesComponent},
  {path:"HomeSalesManager/:id/Activities",component: ActivitiesComponent},
  {path:"HomeSalesManager/:id/Sales/:saleid/inside-sale",component: InsideSaleComponent},

  //Sections Engineering Chief
  {path:"HomeEngineeringChief/:id",component: HomeComponent},
  {path:"HomeEngineeringChief/:id/Customers",component: CustomersComponent},
  {path:"HomeEngineeringChief/:id/Sales",component: SalesComponent},
  {path:"HomeEngineeringChief/:id/Activities",component: ActivitiesComponent},
  {path:"HomeEngineeringChief/:id/Sales/:saleid/inside-sale",component: InsideSaleComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
