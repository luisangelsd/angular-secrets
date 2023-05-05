import { Component, OnInit } from '@angular/core';
import { Oauth2Service } from '../../servicios/oauth2.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { DtoUser } from 'src/app/dtos/dto-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //-- Variables globales
  dtoUser: DtoUser = new DtoUser();

//-- Constructor
  constructor(private servicioAouth: Oauth2Service, private router: Router) { }



  //-- Metodo: Manejo de errores
  private manejoDeErrores(errores: HttpErrorResponse) {
    switch (errores.status) {
      case 400:
        alert("Datos Invalidos");
        break;
        case 401:
          alert("Error: Porque carece de credenciales válidas de autenticación para el recurso solicitado");
          break;
      default:
        alert("Error status: " + errores.status+" "+errores.error);
        break;
    }
  }


  //-- Metodo: Login
  public login(): void {
    this.servicioAouth.login(this.dtoUser).subscribe(
      HttpResponse => {
        this.servicioAouth.guardarAccessTokenEnSessionStorage(HttpResponse.access_token);//-- Guardamos el usuario en sessionSotage
        this.servicioAouth.guardarDtoUserEnSessionStorage(HttpResponse.access_token);   //-- Guardamos el token en sessionSotage
        this.router.navigate(['mi-perfil']);
      },
      HttpErrorResponse => {
        this.manejoDeErrores(HttpErrorResponse);
      }
    )
  }




}
