import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { Oauth2Service } from '../servicios/api-secrets-oauth2.service';

@Injectable()//-- Le cambiamos el nombre a nuestra classe
export class HeadersInterceptor implements HttpInterceptor {

//- Constructor
constructor(private serviceAouth: Oauth2Service){}

//-- Metodo: Este metodo biene por defecto, solo hay que configurarlo
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
     
    let access_token=this.serviceAouth.getAccess_token; 
    if (this.serviceAouth.estaLogeado()) {
        const authReq= req.clone({
            headers:req.headers.set('Authorization', 'Bearer '+ access_token)
        });
        return next.handle(authReq); //-- Añade cabecera
    }

    return next.handle(req); //-- Reenvia al siguiente interceptor
  }

}