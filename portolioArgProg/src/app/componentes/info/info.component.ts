import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from 'src/app/servicios/persona.service';
import { ToastrService } from 'ngx-toastr';
import { ExperienciaLaboral } from 'src/app/experiencia-laboral';




@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  aparecerForm = false;
  misDatos: any = [];
  ulogged: string = '';
  arrayEducacion: any = [];
  form: FormGroup;
  listaTrabajos:any=[];
  accion:string="Agregar";
  id:number|undefined;
  formExperiencia:FormGroup;
  //listaTrabajos:FormControl;
  tipoTrabajo:any=[];

  tipo!: ExperienciaLaboral[];
  //tipoElegida: ExperienciaLaboral = null;


  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private personaService: PersonaService,
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) {
   
/************* form experiencia********************** */
this.formExperiencia= this.formBuilder.group({
  nombre_experiencia:['', Validators.required],
  fecha_inicio:['', [ Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10)]],
  fecha_fin:['',[
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
  ]],
  descripcion:['', Validators.required],
  listaTrabajos:['', Validators.required]
}),


this.listaTrabajos = this.formExperiencia.controls['listaTrabajos'] as FormControl





    /************FORM EDUCACION*************************************** */

    this.form = this.formBuilder.group({
      nombreEducacion: ['', Validators.required],
      fechaInicio: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      fechaFin: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      tipoEducacion: ['', Validators.required],
    });


/*   this.http.get("api/tipoTrabajo/ver").subscribe(data=>{
      this.tipoTrabajo=data;
      console.log(this.tipoTrabajo)
    }) */
    this.personaService.getTipo().subscribe(data=>{
      this.tipo=data;
      
    })
  

  }



  ngOnInit(): void {
    this.ulogged = this.loginService.getUserLogged();
    this.verEducacion();
    this.verExperiencia()
  }

  verExperiencia(){
    this.personaService.verExperiencia().subscribe(data=>{
      this.misDatos=data;
    })
  }

  guardarExperiencia() {
    
    const experiencia: any = {
      nombre_experiencia: this.formExperiencia.get('nombre_experiencia')?.value,
      fecha_inicio: this.formExperiencia.get('fecha_inicio')?.value,
      fecha_fin: this.formExperiencia.get('fecha_fin')?.value,
      descripcion: this.formExperiencia.get('descripcion')?.value,
      tipoTrabajos: this.formExperiencia.get('listaTrabajos')?.value
    }
    console.log(experiencia)
    if(this.id==undefined){
      this.personaService.guardarExperiencia(experiencia).subscribe(data=>{
        this.toastr.success(
          'Educacion registrada con exito',
          'Educacion registrada'
        );
        this.verExperiencia();
        this.formExperiencia.reset();
       })
    }else{
          //editamos
          experiencia.id = this.id;
          this.personaService.actualizarExperiencia(experiencia).subscribe(data=>{
            this.formExperiencia.reset();
            this.accion="Editar";
            this.id=undefined;
            this.verExperiencia();
            this.toastr.info("Educacion actualizada con exito", "Educacion actualizada");

          }) 
    }
  }
  eliminarExperiencia(id: number) {
    this.personaService.eliminarExperiencia(id).subscribe(data=>{
      
   this.toastr.error('Experiencia laboral eliminada con exito', 'Experiencia laboral eliminada');
   this.verExperiencia();
    })
   }

   editarExperiencia(experiencia:any){
    //console.log(experiencia)
    this.accion="editar";
    this.id= experiencia.id;
    this.formExperiencia.patchValue({
      nombre_experiencia:experiencia.nombre_experiencia,
      fecha_inicio:experiencia.fecha_inicio,
      fecha_fin:experiencia.fecha_fin,
      descripcion:experiencia.descripcion,
      listaTrabajos:experiencia.listaTrabajos


    })
  }


  
  
  /**=====================EDUCACION========================================= */
  
  verEducacion(){
    this.personaService.verEducacion().subscribe(data=>{
      this.arrayEducacion = data;
      
    })
  }
  
  guardarEducacion() {
    
    const educacion: any = {
      nombreEducacion: this.form.get('nombreEducacion')?.value,
      fechaInicio: this.form.get('fechaInicio')?.value,
      fechaFin: this.form.get('fechaFin')?.value,
      tipoEducacion: this.form.get('tipoEducacion')?.value
      
    };
    if(this.id==undefined){
      this.personaService.guardarEducacion(educacion).subscribe(data=>{
        this.toastr.success(
          'Educacion registrada con exito',
          'Educacion registrada'
          );
          this.form.reset();
          this.verEducacion();
         
        })
      }else{
        //editamos

          this.personaService.actualizarEducacion(this.id, educacion).subscribe(data=>{
            this.form.reset();
            this.accion="Editar";
            this.id=undefined;
            this.toastr.info("Educacion actualizada con exito", "Educacion actualizada");
            this.verEducacion();

          }) 
    }
  }

  eliminarEducacion(id: number) {
   this.personaService.eliminarEducacion(id).subscribe(data=>{
     
  this.toastr.error('Educacion eliminada con exito', 'Educacion eliminada');
  this.verEducacion();
   })
  }

  editarEducacion(educacion:any){
    this.accion="editar";
    this.id= educacion.id;
    this.form.patchValue({
      nombreEducacion:educacion.nombreEducacion,
      fechaInicio:educacion.fechaInicio,
      fechaFin:educacion.fechaFin,
      tipoEducacion:educacion.tipoEducacion
      

    })
    
  }

  /**=====================LISTA TIPO TRABAJO ========================================= */
  /* verTipoTrabajo(){
    this.personaService.verTipo().subscribe(data=>{
      //this.listaTrabajos=data;
      console.log(data)
    })
  } */

   


}
