import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Oauth2Service } from 'src/app/servicios/api-secrets-oauth2.service';
import { DtoUser } from 'src/app/dtos/dto-user';
import { ServicioDaoApiService } from '../../servicios/api-secrets.service';
import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DtoPaginated } from 'src/app/dtos/dto-paginated';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  //-- Variables
  username: String='';
  dtoUser: DtoUser | any= null;  
  dtoUserSession: DtoUser | any= null;  
  archivoFoto: File | null=null;

  public subirFoto():void{

    //-- Validamos que haya seleccionado un archivo
    if (!this.archivoFoto) {
      Swal.fire("Selecciona un Archivo","","error");
    }else{

      this.serviceApi.updateImagenPerfil(this.archivoFoto, this.dtoUser.username).subscribe(
        HttpRequest =>{
          this.buscarUsuario();
          Swal.fire("¡Foto Actualizada!","","success");
        },
        HttpErrorResponse=>{
          Swal.fire("Error al  Actualizar Imagen",HttpErrorResponse,"error");
        }
      )

    }
  }


    validarFormFotoPerfil( event:any):void{ 
        this.archivoFoto = event.target.files[0];
        //-- Validamos que no sea null
        if (this.archivoFoto != null && this.archivoFoto.type.indexOf('image')<0) { //-- Validamos que sea una iamgen
           this.archivoFoto=null;          
           Swal.fire("Solo puedes seleccionar fotos","","error");
         }
    }


  //-- Metodo: Buscar usuario por username
  public buscarUsuario(){
    this.serviceApi.buscarUsuarioPorUsername(this.dtoUserSession.username).subscribe(
      HttpResponse =>{
        this.dtoUser=HttpResponse;
      },
      HttpErrorResponse=>{
        Swal.fire("Error al Cargar Usuario",HttpErrorResponse,"error");
      }
    );
  }

  public eliminarFoto():void{
    this.serviceApi.eliminarImagenPerfilPorUsername(this.dtoUser.username).subscribe(
      HttpResponse=>{
        this.buscarUsuario();
        Swal.fire("¡Foto Eliminada!","","success");
      },
      HttpErrorResponse=>{
        Swal.fire("Error al Eliminar la Imagen",HttpErrorResponse,"error");
      }
    )

  }

  //-- Constructor
  constructor(
    private oauth2Service: Oauth2Service,
    private serviceApi: ServicioDaoApiService
  ){}


  ngOnInit(): void {
    this.dtoUserSession = this.oauth2Service.getDtoUser;
    this.buscarUsuario();
  }

  
  

 

}
