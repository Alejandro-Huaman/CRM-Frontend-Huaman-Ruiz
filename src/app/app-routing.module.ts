import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EngineeringchiefGuard } from './guards/engineering_chief/engineeringchief.guard';
import { LoginGuard } from './guards/login.guard';
import { ProjectmanagerGuard } from './guards/project_manager/projectmanager.guard';
import { SalemanagerGuard } from './guards/sale_manager/salemanager.guard';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { CreateCustomersComponent } from './pages/customers/create-customers/create-customers.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { EditPasswordComponent } from './pages/profile/edit-password/edit-password.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { OptionsRegisterComponent } from './pages/register/options-register/options-register.component';
import { RegisterComponent } from './pages/register/register.component';
import { CreateSalesComponent } from './pages/sales/create-sales/create-sales.component';
import { InsideSaleComponent } from './pages/sales/inside-sale/inside-sale.component';
import { SalesComponent } from './pages/sales/sales.component';

const routes: Routes = [
  //Login and registers
  {path:"login",component: LoginComponent,canActivate: [LoginGuard], data:{expectedRol: ['Sales_Manager','Project_Manager','Engineering_chief'] }},
  {path:"register/SalesManager",component: RegisterComponent},
  {path:"register/ProjectManager",component: RegisterComponent},
  {path:"register/EngineeringChief",component: RegisterComponent},
  {path:"register-option",component: OptionsRegisterComponent},
  {path:"recover-password",component: RecoverPasswordComponent},
  
  //Sections Project Manager
  {path:"HomeProjectManager/:id",component: HomeComponent,canActivate: [ProjectmanagerGuard], data:{expectedRol: ['Project_Manager'] }},
  {path:"HomeProjectManager/:id/Customers",component: CustomersComponent,canActivate: [ProjectmanagerGuard], data:{expectedRol: ['Project_Manager'] }},
  {path:"HomeProjectManager/:id/Sales",component: SalesComponent,canActivate: [ProjectmanagerGuard], data:{expectedRol: ['Project_Manager'] }},
  {path:"HomeProjectManager/:id/Activities",component: ActivitiesComponent,canActivate: [ProjectmanagerGuard], data:{expectedRol: ['Project_Manager'] }},
  {path:"HomeProjectManager/:id/Sales/:saleid/inside-sale",component: InsideSaleComponent,canActivate: [ProjectmanagerGuard], data:{expectedRol: ['Project_Manager'] }},
  {path:"HomeProjectManager/:id/Profile",component: ProfileComponent,canActivate: [ProjectmanagerGuard], data:{expectedRol: ['Project_Manager'] }},
  {path:"HomeProjectManager/:id/Edit-password",component: EditPasswordComponent,canActivate: [ProjectmanagerGuard], data:{expectedRol: ['Project_Manager'] }},

  //Sections Sales Manager
  {path:"HomeSalesManager/:id",component: HomeComponent,canActivate: [SalemanagerGuard], data:{expectedRol: ['Sales_Manager'] }},
  {path:"HomeSalesManager/:id/Customers",component: CustomersComponent,canActivate: [SalemanagerGuard], data:{expectedRol: ['Sales_Manager'] }},
  {path:"HomeSalesManager/:id/Sales",component: SalesComponent,canActivate: [SalemanagerGuard], data:{expectedRol: ['Sales_Manager'] }},
  {path:"HomeSalesManager/:id/Activities",component: ActivitiesComponent,canActivate: [SalemanagerGuard], data:{expectedRol: ['Sales_Manager'] }},
  {path:"HomeSalesManager/:id/Sales/:saleid/inside-sale",component: InsideSaleComponent,canActivate: [SalemanagerGuard], data:{expectedRol: ['Sales_Manager'] }},
  {path:"HomeSalesManager/:id/Profile",component: ProfileComponent,canActivate: [SalemanagerGuard], data:{expectedRol: ['Sales_Manager'] }},
  {path:"HomeSalesManager/:id/Edit-password",component: EditPasswordComponent,canActivate: [SalemanagerGuard], data:{expectedRol: ['Sales_Manager'] }},

  //Sections Engineering Chief
  {path:"HomeEngineeringChief/:id",component: HomeComponent,canActivate: [EngineeringchiefGuard], data:{expectedRol: ['Engineering_chief'] }},
  {path:"HomeEngineeringChief/:id/Customers",component: CustomersComponent,canActivate: [EngineeringchiefGuard], data:{expectedRol: ['Engineering_chief'] }},
  {path:"HomeEngineeringChief/:id/Sales",component: SalesComponent,canActivate: [EngineeringchiefGuard], data:{expectedRol: ['Engineering_chief'] }},
  {path:"HomeEngineeringChief/:id/Activities",component: ActivitiesComponent,canActivate: [EngineeringchiefGuard], data:{expectedRol: ['Engineering_chief'] }},
  {path:"HomeEngineeringChief/:id/Sales/:saleid/inside-sale",component: InsideSaleComponent,canActivate: [EngineeringchiefGuard], data:{expectedRol: ['Engineering_chief'] }},
  {path:"HomeEngineeringChief/:id/Profile",component: ProfileComponent,canActivate: [EngineeringchiefGuard], data:{expectedRol: ['Engineering_chief'] }},
  {path:"HomeEngineeringChief/:id/Edit-password",component: EditPasswordComponent,canActivate: [EngineeringchiefGuard], data:{expectedRol: ['Engineering_chief'] }},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
