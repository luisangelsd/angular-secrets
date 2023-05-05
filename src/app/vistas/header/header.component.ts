import { Component, OnInit } from '@angular/core';
import { Oauth2Service } from '../../servicios/oauth2.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  
  //-- Constructor
  constructor(public servicioAuth : Oauth2Service, private router: Router) { }



  
 // =============================== METODOS PRINCIPALES ===============================
   //-- Metodo: Salir
   public salir(){
    this.servicioAuth.eliminarSession();
    this.router.navigate(['login']);
   }



}
