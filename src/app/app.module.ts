import { NgModule } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { VistaHomeComponent } from './vistas/vista-home/vista-home.component';
import { HeaderComponent } from './vistas/header/header.component';
import { FooterComponent } from './vistas/footer/footer.component';
import { LoginComponent } from './vistas/login/login.component';
import { MiPerfilComponent } from './vistas/mi-perfil/mi-perfil.component';

const routes: Routes=[
  {path:'', component:VistaHomeComponent},
  {path:'login', component:LoginComponent},
  {path:'mi-perfil', component:MiPerfilComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    VistaHomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    MiPerfilComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, 
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
