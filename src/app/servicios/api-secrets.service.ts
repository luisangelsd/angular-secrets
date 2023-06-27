import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { DtoPaginated } from '../dtos/dto-paginated';
import { DtoSecret } from '../dtos/dto-secret';
import { DtoUser } from '../dtos/dto-user';
import { DtoCategoria } from '../dtos/dto-categoria';

@Injectable({
  providedIn: 'root'
})
export class ServicioDaoApiService {

//============ Variables globales
private urlEndPoint: String="http://localhost:8080/";
private urlEndPointUsuarios: String="http://localhost:8080/usuarios/";
private urlEndPoindCategorias: String="http://localhost:8080/categorias/";



// =========================== ENDPOINDS SECRETOS ===========================

//======= Listar 
public listarSecretos():Observable<DtoSecret[]>{
  return this.http.get(this.urlEndPoint+"listar").pipe(
    map((respuesta) => respuesta as DtoSecret[]),
    catchError (e=>{
      return throwError(e);
    })
  );
}


//======= Listar paginado
public listarPaginadoSecretos(page:number, elements:number):Observable<DtoPaginated>{
  return this.http.get(this.urlEndPoint+"listar/page/"+page+"/elements/"+elements).pipe(
    map((respuesta) => respuesta as DtoPaginated),
    catchError (e=>{
      return throwError(e);
    })
  );
}


//======= Listar por Categoria
public listarSecretosPorIdCategoria(id:any):Observable<DtoSecret[]>{
  return this.http.get(this.urlEndPoint+"listar/categoria/"+id).pipe(
    map((respuesta) => respuesta as DtoSecret[]),
    catchError (e=>{
      return throwError(e);
    })
  );
}



//======= Guardar
public guardarSecreto(entitySecreto:DtoSecret, idCategoria:any):Observable<DtoSecret>{
  return this.http.post(this.urlEndPoint+"guardar/categoria-id/"+idCategoria, entitySecreto).pipe(
    map((respuesta)=> respuesta as DtoSecret),
    catchError(e=>{
      return throwError(e);
    })
  )
} 



    //======= Eliminar: Admin
    public eliminarSecretoComoAdmin(id:any):Observable <DtoSecret>{
      return  this.http.delete(this.urlEndPoint+"adm/eliminar/"+id).pipe(
        map((respuesta)=> respuesta as DtoSecret)
        ,catchError(e=>{
          return throwError(e);
        })
      )
    }
    

//======= Buscar
public buscarSecreto(id:any):Observable<DtoSecret>{
  return this.http.get(this.urlEndPoint+"buscar/"+id).pipe(
    map((respuesta)=> respuesta as DtoSecret)
    ,catchError(e=>{
      return throwError(e);
    })
  )
}//end



  //======= Editar
  public actualizarSecreto(entitySecreto: DtoSecret, idCategoria:any): Observable<DtoSecret>{
    return this.http.put(this.urlEndPoint+"editar/"+entitySecreto.id+"/categoria-id/"+idCategoria, entitySecreto).pipe(
      map((respuesta)=> respuesta as DtoSecret)
      ,catchError(e=>{
        return throwError(e);
      })
    )
  }

  //======= Editar: Admin/User
  public actualizarSecretoAdmin(entitySecreto: DtoSecret, idCategoria:any): Observable<DtoSecret>{
    return this.http.put(this.urlEndPoint+"adm/editar/"+entitySecreto.id+"/categoria-id/"+idCategoria, entitySecreto).pipe(
      map((respuesta)=> respuesta as DtoSecret)
      ,catchError(e=>{
        return throwError(e);
      })
    )
  }

 // =========================== ENDPOINDS CATEGORIAS ===========================
 

  //======= Listar
 public listarCategorias():Observable<DtoCategoria[]>{
  return this.http.get(this.urlEndPoindCategorias+"listar/").pipe(
    map((respuesta) => respuesta as DtoCategoria[]),
    catchError (e=>{
      return throwError(e);
    })
  );
}


  


// =========================== ENDPOINDS CUENTA ===========================

//======= Obtener usuario: Admin/User
public buscarUsuarioPorUsername(username: string): Observable<DtoUser>{
  return this.http.get(this.urlEndPointUsuarios+"ver/usuario/"+username).pipe(
    map(respuesta => respuesta as DtoUser)
  ,catchError(e=>{
    return throwError(e);
  })
  )
}

 //======= Eliminar Foto: Admin/User
 public eliminarImagenPerfilPorUsername(username: string){
  return this.http.delete(this.urlEndPointUsuarios+"imagen-perfil/eliminar/"+username).pipe(
    map(respuesta=>{
    }),catchError(e=> {
      return throwError(e);
    })
  ) 
}

 //======= Actualizar Foto: Admin/User
 public updateImagenPerfil(archivo: any, username: string){
  let fdata=new FormData();         //-- Para poder manipular el archivo
  fdata.append('archivo', archivo); //-- Asignamos nombre del parametro y su valor
  fdata.append('username', username); //-- Asignamos nombre del parametro y su valor
  return this.http.post(this.urlEndPointUsuarios+"imagen-perfil/upload/", fdata).pipe( //-- Enviamos la informacion
    map(respuesta=>{
    }),catchError(e=> {
      return throwError(e);
    })
  ) 
}


  




  //============ Importaciónes
  constructor(
    private http: HttpClient
  ) { }

}
