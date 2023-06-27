import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Oauth2Service } from '../servicios/api-secrets-oauth2.service';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccedeConSession implements CanActivate {


  //-- Constructor
  constructor(private oauth2Service: Oauth2Service, private router: Router) { }


  //-- Si regresa true, deja pasar, si regresa false no.
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //-- Validamos si esta logeado
    if (this.oauth2Service.estaLogeado() == true) {
      return true;
    }
      this.router.navigate(['login']);
      return false;
  }

  

}
