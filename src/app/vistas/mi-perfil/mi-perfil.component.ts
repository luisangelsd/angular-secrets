import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Oauth2Service } from 'src/app/servicios/oauth2.service';
import { DtoUser } from 'src/app/dtos/dto-user';
import { ServicioDaoApiService } from '../../servicios/dao-api.service';
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

    validarFormFotoPerfil( event:any):void{   
        this.archivoFoto = event.target.files[0];
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
