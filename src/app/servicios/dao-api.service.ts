import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DtoPaginated } from '../dtos/dto-paginated';
import { DtoSecret } from '../dtos/dto-secret';

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




// =========================== METODOS ADMIN ===========================


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
