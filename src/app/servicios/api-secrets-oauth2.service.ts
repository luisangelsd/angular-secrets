import { Injectable } from '@angular/core';
import { DtoUser } from '../dtos/dto-user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NonNullAssert } from '@angular/compiler';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Oauth2Service {


  //===================== Variables Globales
  private dtoUser: DtoUser | null=null;


  //===================== Constructor
  constructor(private http: HttpClient) { }



  //==========================================  Metodos Principales ==========================================


  //-- Metodo: Solicitar un Tokend, cons los datos de acceso de la plataforma y al usuario
  public login(dtoUser: DtoUser):Observable<any> {

    const  urlEndPoint:string="http://localhost:8080/oauth/token";
    const credencialesApp:string=btoa('angularapp'+':'+'87654321'); //-- bto: Encripta
    const httpHeaders=new HttpHeaders({                             //-- Configuración de la aplicacion
      'Content-Type':'application/x-www-form-urlencoded',
      'Authorization':'Basic '+ credencialesApp
    });

    let params=new URLSearchParams();
    params.set('grant_type','password');
    params.set('username', dtoUser.username);
    params.set('password',dtoUser.password);
    
    return this.http.post(urlEndPoint,params.toString(),{ headers: httpHeaders}); //-- Retornamos respuesta
    
  }

  //-- Metodo: Guardar DtoUser en SessionStorage
  public guardarDtoUserEnSessionStorage(access_token:string):void{
    let datosDtoUser=this.obtenerDtoUserDelAccessToken(access_token); //-- Obtenemos solo información de usuario, usuario, roles, etc.
    this.dtoUser=new DtoUser();
    this.dtoUser.username=datosDtoUser.user_name;  //-- Pasamos los datos del JSON a DtoUser
    this.dtoUser.roles=datosDtoUser.authorities;  //-- Pasamos los datos del JSON a DtoUser
    sessionStorage.setItem('usuario',JSON.stringify(this.dtoUser)); //-- Guardamos Cooke
  }

  //-- Metodo: Guardar Token en SessionStorage
public guardarAccessTokenEnSessionStorage(access_token: string):void{
    sessionStorage.setItem('access_token', access_token);
}


  //=====================  Metodos Auxiliares


  // Metodo: Le enviamos el token completo, obtenemos la parte 1, donde estab los datos, los convertimos a json y los regresamos
  private obtenerDtoUserDelAccessToken(access_token: string):any{
    if (access_token!=null) {
      return JSON.parse(atob(access_token.split('.')[1]));
    }
  }

  // Metodo: Regresamos sus valores si se encuentran en su objeto o en sessionSotage, si no es así regresa un null
  public get getAccess_token():string | null{

    if (sessionStorage.getItem('access_token')!=null) {
      return sessionStorage.getItem('access_token');
    }
   
    return null;
  }

  // Metodo: Regresamos sus valores si se encuentran en su objeto o en sessionSotage, si no es así regresa un null
  public get getDtoUser():DtoUser | null{
    if (this.dtoUser!=null) {
      return this.dtoUser;
    } else if(sessionStorage.getItem('usuario')!=null){
      return JSON.parse(sessionStorage.getItem('usuario')!) as DtoUser;
    }

    return null;
  }



    //-- Metodo: Verifica si el usuario esta autenticado y regresa un true o false
    public estaLogeado(): boolean{
      if (this.getAccess_token==null) {
        return false;
      }
      return true;
    }


    //-- Eliminar Sesión
    public eliminarSession():void{
      sessionStorage.clear();
     // sessionStorage.removeItem('usuario'); //-- Alternativa
    // sessionStorage.removeItem('token');  //-- Alternativa
    }


      //-- Metodo: Varifica si el usuario tiene un Rol
      public tieneRol(rol:string):boolean{
        if (this.getDtoUser?.roles.includes(rol)) {
          return true;
        }else{return false;}
      }


      
  //-- Metodo: PENDIENTE**
  public tokenExpirado():boolean{   
    return true;
  }

}