import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { OptionsRegisterComponent } from './pages/register/options-register/options-register.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path:"login",component: LoginComponent},
  {path:"register",component: RegisterComponent},
  {path:"register-option",component: OptionsRegisterComponent},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
