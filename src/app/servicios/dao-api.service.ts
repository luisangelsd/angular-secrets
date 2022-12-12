import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { EntitySecreto } from '../entitys/entity-secreto';

@Injectable({
  providedIn: 'root'
})
export class ServicioDaoApiService {

//============ Variables globales
private urlEndPoint: String="https://sc-spring-api-dao.herokuapp.com/";
//private urlEndPoint: String="http://localhost:8080/";


//============ Listar 
public listarSecretos():Observable<EntitySecreto[]>{
  return this.http.get(this.urlEndPoint+"listar").pipe(
    map((respuesta) => respuesta as EntitySecreto[]),
    catchError (e=>{
      return throwError(e);
    })
  );
}



public listarSecretosPorCategoria(categoria:any):Observable<EntitySecreto[]>{
  return this.http.get(this.urlEndPoint+"listar/"+categoria).pipe(
    map((respuesta) => respuesta as EntitySecreto[]),
    catchError (e=>{
      return throwError(e);
    })
  );
}



//============ Guardar
public guardarSecreto(entitySecreto:EntitySecreto):Observable<EntitySecreto>{
  return this.http.post(this.urlEndPoint+"guardar", entitySecreto).pipe(
    map((respuesta)=> respuesta as EntitySecreto),
    catchError(e=>{
      return throwError(e);
    })
  )
} 


//============ Eliminar
public eliminarSecreto(id:any):Observable <EntitySecreto>{
  return  this.http.delete(this.urlEndPoint+"eliminar/"+id).pipe(
    map((respuesta)=> respuesta as EntitySecreto)
    ,catchError(e=>{
      return throwError(e);
    })
  )
}

//============ Buscar
public buscarSecreto(id:any):Observable<EntitySecreto>{
  return this.http.get(this.urlEndPoint+"buscar/"+id).pipe(
    map((respuesta)=> respuesta as EntitySecreto)
    ,catchError(e=>{
      return throwError(e);
    })
  )
}//end



  //============ Editar
  public actualizarSecreto(entitySecreto: EntitySecreto): Observable<EntitySecreto>{
    return this.http.put(this.urlEndPoint+"editar/"+entitySecreto.id, entitySecreto).pipe(
      map((respuesta)=> respuesta as EntitySecreto)
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
