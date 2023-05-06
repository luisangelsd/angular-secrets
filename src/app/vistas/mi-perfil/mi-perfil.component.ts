import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Oauth2Service } from 'src/app/servicios/oauth2.service';
import { DtoUser } from 'src/app/dtos/dto-user';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  //-- Variables
  dtoUser: DtoUser  | null = null;  

  //-- Constructor
  constructor(
    private oauth2Service: Oauth2Service
  ){}

  ngOnInit(): void {
    this.dtoUser = this.oauth2Service.getDtoUser;
  }

  
  

 

}
