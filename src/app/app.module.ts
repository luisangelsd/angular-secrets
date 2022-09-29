import { NgModule } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';


import { VistaHomeComponent } from './vistas/vista-home/vista-home.component';
import { HeaderComponent } from './vistas/header/header.component';
import { FooterComponent } from './vistas/footer/footer.component';




@NgModule({
  declarations: [
    AppComponent,
    VistaHomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
