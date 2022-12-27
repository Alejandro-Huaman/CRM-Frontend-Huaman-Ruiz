import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './pages/register/register.component';
import { OptionsRegisterComponent } from './pages/register/options-register/options-register.component';
import { InitheaderComponent } from './pages/headers/initheader/initheader.component';
import { HeaderHomeComponent } from './pages/headers/header-home/header-home.component';
import { RegisterAnswerComponent } from './pages/dialog-answer-messages/register-answer/register-answer.component';
import { HomeComponent } from './pages/home/home.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { SalesComponent } from './pages/sales/sales.component';
import { CreateCustomersComponent } from './pages/customers/create-customers/create-customers.component';
import { CreateSalesComponent } from './pages/sales/create-sales/create-sales.component';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { InsideSaleComponent } from './pages/sales/inside-sale/inside-sale.component';
import { SwiperModule } from 'swiper/angular';
import { HttpClientModule } from '@angular/common/http';
import { CreateTaskDialogComponent } from './pages/dialog-answer-messages/create-task-dialog/create-task-dialog.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { EditPasswordComponent } from './pages/profile/edit-password/edit-password.component';

@NgModule({
  declarations: [	
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OptionsRegisterComponent,
    InitheaderComponent,
    HeaderHomeComponent,
    RegisterAnswerComponent,
    HomeComponent,
    CustomersComponent,
    SalesComponent,
    CreateCustomersComponent,
    CreateSalesComponent,
    ActivitiesComponent,
    InsideSaleComponent,
    CreateTaskDialogComponent,
    ProfileComponent,
    RecoverPasswordComponent,
    EditPasswordComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    SwiperModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
