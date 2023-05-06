import { NgModule } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { VistaHomeComponent } from './vistas/vista-home/vista-home.component';
import { HeaderComponent } from './vistas/header/header.component';
import { FooterComponent } from './vistas/footer/footer.component';
import { LoginComponent } from './vistas/login/login.component';
import { MiPerfilComponent } from './vistas/mi-perfil/mi-perfil.component';
import { AccedeSinSession } from './guards/accede-sin-session.guard';
import { AccedeConSession } from './guards/accede-con-session.guard';
import { HeadersInterceptor } from './interceptores/headers.interceptor';

const routes: Routes=[
  {path:'', component:VistaHomeComponent},
  {path:'login', component:LoginComponent,canActivate:[AccedeSinSession]},
  {path:'mi-perfil', component:MiPerfilComponent, canActivate:[AccedeConSession]}
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
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
