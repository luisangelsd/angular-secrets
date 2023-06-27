import { Component, OnInit } from '@angular/core';
import { Oauth2Service } from '../../servicios/api-secrets-oauth2.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { DtoUser } from 'src/app/dtos/dto-user';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

//-- Validar formulario
  public validacionesFormLogin = new FormGroup({
    form_user: new FormControl('', [Validators.required]),
    form_password: new FormControl('',[Validators.required])
  });


// =============================== METODOS PRINCIPALES ===============================

    //-- Metodo: Login, valida antes que el form sea valido
    public login(): void {

      if(this.validacionesFormLogin.valid){    
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
      }else{
        alert("Ingresa usuario y contraseña :)");
      }
    }




// =============================== METODOS AUXILIARES ===============================
  
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



}
