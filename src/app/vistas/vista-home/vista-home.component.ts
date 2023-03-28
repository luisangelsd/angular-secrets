import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { ServicioDaoApiService } from '../../servicios/dao-api.service';
import { EntityListarFiltro } from '../../dtos/entity-listar-filtro';
import { DtoSecret } from '../../dtos/dto-secret';

@Component({
  selector: 'app-vista-home',
  templateUrl: './vista-home.component.html',
  styleUrls: ['./vista-home.component.css']
})
export class VistaHomeComponent implements OnInit {


  //----- Constructor
  constructor(
    private servicioDao: ServicioDaoApiService
  ) { }

   //----- Variables globales
  public listaSecretos: DtoSecret[]=[];
  public entitySecreto: DtoSecret = new DtoSecret();
  public entitySecretoGuardado: DtoSecret = new DtoSecret();
  public entityListarFiltro: EntityListarFiltro = new EntityListarFiltro();

  public mensajeValidarForm: String = "";
  public tituloBtn: String = "";
  public tituloForm: String = "";
  public puedeEditarSecreto: Boolean = false;
  public numeroPaginas: number [] = [];
   




  //----- Validar formulario guardar y/o editar
  validarFormulario = new FormGroup({
    fg_secreto: new FormControl("", [Validators.required]),
    fg_categoria: new FormControl("", Validators.required),
    fg_id: new FormControl(),
    fg_fCracion: new FormControl()

  });

  
  //----- Validar formulario filtrar
  formFiltrarCategoria = new FormGroup({
    formFiltrarCategoria_opcion: new FormControl("", Validators.required)
  });



  //----- Limpiar formulario
  private limpiarForm(): void {
    this.validarFormulario.reset();
  }

  //----- Activar formulario editar
  private activarFormularioEditar() {
    this.tituloForm = "¡Estas punto de editar tu secreto!";
    this.tituloBtn = "Editar Secreto";
  }

  //----- Activar formulario guardar
  public activarFormularioGuardar() {
    this.tituloForm = "¡Comparte tu secreto aquí!";
    this.tituloBtn = "Guardar Secreto";
    this.limpiarForm();
  }

  //-- Funcion de flecha
  private creandoPaginadoParaRecorrer=(paginas: number | undefined):void =>{
    this.numeroPaginas=[];
    if(paginas!=undefined){
      for (let i = 0; i < paginas; i++) {
        this.numeroPaginas.push(i);
      }
    }  
  }



    //----- Metodo listar secretos por paginando
    public  listarSecretosPaginado(pagina:number): void {
      this.servicioDao.listarPaginadoSecretos(pagina, 6 ).subscribe(respuesta => {
        this.listaSecretos = respuesta.content;
        console.warn(respuesta.totalPages);
        this.creandoPaginadoParaRecorrer(respuesta.totalPages);
        
      },
        err => {
          switch (err.status) {
            default:
              swal.fire("¡ERROR AL CARGAR!",err+ "Lo sentimos, ha ocurrido un error al cargar los secretos, recarga la página o vuelve a intentar más tarde", "error");
              break;
          }
        }
      );
    }//end

     //----- Metodo listar secretos por filtro
  public filtrarSecretosCategoria(): void {

    if (this.formFiltrarCategoria.valid) {

      if (this.entityListarFiltro.categoria=="Todos") {
        this.listarSecretosPaginado(0);
      } else {
         this.servicioDao.listarSecretosPorCategoria(this.entityListarFiltro.categoria).subscribe(respuesta => {
                 this.listaSecretos = respuesta;  
          },
            err => {
              switch (err.status) {

                case 404:
                  swal.fire("¡SECRETOS NO ENCONTRADOS!", "Lo sentimos, no existe ningun secreto relacionado a esta categoria", "error");

                  break;

                default:
                  swal.fire("¡ERROR AL LISTAR LOS SECRETOS!", "Lo sentimos, ha ocurrido un error al buscar estos secretos, recarga la página o vuelve a intentar más tarde", "error");
                  break;
              }
            })
      }

    }

  }

  //----- Metodo guardar/editar secreto
  public guardarSecreto(): void {

    if (this.validarFormulario.valid) {

      if (!this.entitySecreto.id) {

        this.servicioDao.guardarSecreto(this.entitySecreto).subscribe(respuesta => {
          swal.fire("¡SECRETO GUARDADO!", "", "success");
          this.entitySecretoGuardado = respuesta;
          this.puedeEditarSecreto = true;

          this.limpiarForm();
          this.listarSecretosPaginado(0);
          this.activarFormularioGuardar();
        },
          err => {

            switch (err.status) {
              default:
                swal.fire("¡ERROR AL GUARDAR!", "Lo sentimos, ha ocurrido un error, intentalo nuevamente", "error");
                break;
            }

          });


      } else {

        this.servicioDao.actualizarSecreto(this.entitySecreto).subscribe(respuesta => {

          swal.fire("¡SECRETO ACTUALIZADO!", "", "success");
          this.entitySecretoGuardado = respuesta;
          this.puedeEditarSecreto = true;
          this.limpiarForm();
          this.listarSecretosPaginado(0);
          this.activarFormularioGuardar();
        },
          err => {

            switch (err.status) {
              default:
                swal.fire("¡ERROR AL ACTUALIZAR!", "Lo sentimos, ha ocurrido un error, intentalo nuevamente" + err.status, "error");
                break;
            }

          });

      }

      this.mensajeValidarForm = "";
    } else {
      this.mensajeValidarForm = "*Rellena todos los campos";

    }



  }

  //----- Metodo eliminar secreto
  public eliminarSecreto(entitySecreto: DtoSecret): void {
    swal.fire({
      title: '¿Estas seguro/a?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ¡Eliminalo!',
      cancelButtonText: 'No, ¡Cancelar!'
    }).then((result) => {

      if (result.isConfirmed) {

        this.servicioDao.eliminarSecreto(entitySecreto.id).subscribe(respuesta => {
          swal.fire("¡SECRETO ELIMINADO!", "", "success");

          if (this.entitySecretoGuardado == this.entitySecretoGuardado) {
            this.puedeEditarSecreto = false;
          }

          this.listarSecretosPaginado(0);
        },
          err => {
            switch (err.status) {
              default:
                swal.fire("¡ERROR AL ELIMINAR EL SECRETO!", "Lo sentimos, ha ocurrido un error al eliminar este secreto, recarga la página o vuelve a intentar más tarde", "error");
                break;
            }
          }
        );

      }

    })
  }//end

  //----- Metodo buscar secreto
  public buscarSecreto(entitySecreto: DtoSecret) {
    this.servicioDao.buscarSecreto(entitySecreto.id).subscribe(
    respuesta => {
      this.entitySecreto = respuesta;
      this.activarFormularioEditar();
      this.listarSecretosPaginado(0);
      document.getElementById("btnConfesar")?.click();
    }, err => {
      switch (err.status) {
        default:
          swal.fire("¡ERROR AL BUSCAR EL SECRETO!", "Lo sentimos, ha ocurrido un error al buscar este secreto, recarga la página o vuelve a intentar más tarde", "error");
          break;
      }
    })
  }

 

  ngOnInit(): void {
    this.activarFormularioGuardar();
    this.listarSecretosPaginado(0);
  }




}
