import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DtoPaginated } from '../dtos/dto-paginated';
import { DtoSecret } from '../dtos/dto-secret';
import { DtoUser } from '../dtos/dto-user';

@Injectable({
  providedIn: 'root'
})
export class ServicioDaoApiService {

//============ Variables globales
//private urlEndPoint: String="http://springsecretsv2-env.eba-mbdgb28c.us-west-2.elasticbeanstalk.com/";
//private urlEndPointAdmin: String="http://springsecretsv2-env.eba-mbdgb28c.us-west-2.elasticbeanstalk.com/";

private urlEndPoint: String="http://localhost:8080/";
private urlEndPointAdmin: String="http://localhost:8080/adm/";


//============ Listar 
public listarSecretos():Observable<DtoSecret[]>{
  return this.http.get(this.urlEndPoint+"listar").pipe(
    map((respuesta) => respuesta as DtoSecret[]),
    catchError (e=>{
      return throwError(e);
    })
  );
}

//============ Listar paginado
public listarPaginadoSecretos(page:number, elements:number):Observable<DtoPaginated>{
  return this.http.get(this.urlEndPoint+"listar/page/"+page+"/elements/"+elements).pipe(
    map((respuesta) => respuesta as DtoPaginated),
    catchError (e=>{
      return throwError(e);
    })
  );
}



public listarSecretosPorCategoria(categoria:any):Observable<DtoSecret[]>{
  return this.http.get(this.urlEndPoint+"listar/"+categoria).pipe(
    map((respuesta) => respuesta as DtoSecret[]),
    catchError (e=>{
      return throwError(e);
    })
  );
}



//============ Guardar
public guardarSecreto(entitySecreto:DtoSecret):Observable<DtoSecret>{
  return this.http.post(this.urlEndPoint+"guardar", entitySecreto).pipe(
    map((respuesta)=> respuesta as DtoSecret),
    catchError(e=>{
      return throwError(e);
    })
  )
} 


//============ Eliminar
public eliminarSecreto(id:any):Observable <DtoSecret>{
  return  this.http.delete(this.urlEndPoint+"eliminar/"+id).pipe(
    map((respuesta)=> respuesta as DtoSecret)
    ,catchError(e=>{
      return throwError(e);
    })
  )
}

//============ Buscar
public buscarSecreto(id:any):Observable<DtoSecret>{
  return this.http.get(this.urlEndPoint+"buscar/"+id).pipe(
    map((respuesta)=> respuesta as DtoSecret)
    ,catchError(e=>{
      return throwError(e);
    })
  )
}//end



  //============ Editar
  public actualizarSecreto(entitySecreto: DtoSecret): Observable<DtoSecret>{
    return this.http.put(this.urlEndPoint+"editar/"+entitySecreto.id, entitySecreto).pipe(
      map((respuesta)=> respuesta as DtoSecret)
      ,catchError(e=>{
        return throwError(e);
      })
    )
  }


  


// =========================== METODOS AUTH2 ===========================

//============ Obtener usuario: Admin/User
public buscarUsuarioPorUsername(username: string): Observable<DtoUser>{
  return this.http.get(this.urlEndPointAdmin+"ver/usuario/"+username).pipe(
    map(respuesta => respuesta as DtoUser)
  ,catchError(e=>{
    return throwError(e);
  })
  )
}

 //============ Eliminar Foto: Admin/User
 public eliminarImagenPerfilPorUsername(username: string){
  return this.http.delete(this.urlEndPointAdmin+"imagen-perfil/eliminar/"+username).pipe(
    map(respuesta=>{
    }),catchError(e=> {
      return throwError(e);
    })
  ) 
}

 //============ Actualizar Foto: Admin/User
 public updateImagenPerfil(archivo: any, username: string){
  let fdata=new FormData();         //-- Para poder manipular el archivo
  fdata.append('archivo', archivo); //-- Asignamos nombre del parametro y su valor
  fdata.append('username', username); //-- Asignamos nombre del parametro y su valor
  return this.http.post(this.urlEndPointAdmin+"imagen-perfil/upload/", fdata).pipe( //-- Enviamos la informacion
    map(respuesta=>{
    }),catchError(e=> {
      return throwError(e);
    })
  ) 
}


  //============ Editar: Admin
  public actualizarSecretoAdmin(entitySecreto: DtoSecret): Observable<DtoSecret>{
    return this.http.put(this.urlEndPointAdmin+"editar/"+entitySecreto.id, entitySecreto).pipe(
      map((respuesta)=> respuesta as DtoSecret)
      ,catchError(e=>{
        return throwError(e);
      })
    )
  }

    //============ EliminarAdmin
public eliminarSecretoComoAdmin(id:any):Observable <DtoSecret>{
  return  this.http.delete(this.urlEndPointAdmin+"eliminar/"+id).pipe(
    map((respuesta)=> respuesta as DtoSecret)
    ,catchError(e=>{
      return throwError(e);
    })
  )
}




  //============ Importaciónes
  constructor(
    private http: HttpClient
  ) { }

}
