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

@NgModule({
  declarations: [	
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OptionsRegisterComponent,
    InitheaderComponent,
    HeaderHomeComponent,
    RegisterAnswerComponent,
    HomeComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
