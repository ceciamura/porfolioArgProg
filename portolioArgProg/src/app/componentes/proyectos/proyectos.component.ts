import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from 'src/app/servicios/persona.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  ulogged:string="";
  accion!:string;
  id:number|undefined;

  formProyecto:FormGroup;
  misProyectos:any=[];


  constructor(private http:HttpClient,
              private loginService:LoginService,
              private personaService: PersonaService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService) { 

   /*  http.get(this.rutaapi+"proyecto/ver").subscribe(data=>{
      this.misDatos=data;
      
     }) */

     this.formProyecto=this.formBuilder.group({
      nombre:['', Validators.required],
      github:['', Validators.required],
      portada:['', Validators.required],
      anio:['',[
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]]
    })
  }


  


  ngOnInit(): void {
    this.ulogged= this.loginService.getUserLogged();
    this.verProyecto();
  }


  verProyecto(){
    this.personaService.verProyecto().subscribe(data=>{
      this.misProyectos = data; 
      //console.log(this.misProyectos)
    })

  }

  guardarProyecto(){
    const proyecto:any = {
      nombre:this.formProyecto.get('nombre')?.value,
      github:this.formProyecto.get('github')?.value,
      portada:this.formProyecto.get('portada')?.value,
      anio:this.formProyecto.get('anio')?.value      
    }
    console.log(proyecto)
  
    if(this.id==undefined){
      this.personaService.guardarProyecto(proyecto).subscribe(data=>{
        this.toastr.success(
          'Proyecto creado con exito',
          'Proyecto creado'
        );
        this.verProyecto();
        this.formProyecto.reset();
      })
    }else{
      //Editamos
      proyecto.id=this.id;
      this.personaService.actualizarProyecto(proyecto).subscribe(data=>{
        this.formProyecto.reset();
        this.accion='Editar';
        this.id=undefined;
        this.verProyecto();
        this.toastr.info(
          'Proyecto actualizado con exito',
          'Proyecto actualizado'
        )
      })
    }
  }
  eliminarProyecto(id:number){
    this.personaService.eliminarProyecto(id).subscribe(data=>{
      this.toastr.error(
        'Proyecto eliminado con exito',
        'Proyecto eliminado'
      )
      this.verProyecto();
    })
  }


  editarProyecto(proyecto:any){
    this.accion="editar";
    this.id=proyecto.id;
    this.formProyecto.patchValue({
      nombre:proyecto.nombre,
      github:proyecto.github,
      portada:proyecto.portada,
      anio:proyecto.anio
    })
    console.log(proyecto)
  }


}
