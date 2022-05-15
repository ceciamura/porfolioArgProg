import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonaService } from 'src/app/servicios/persona.service';
import { ToastrService} from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-formulario-datos-personales',
  templateUrl: './formulario-datos-personales.component.html',
  styleUrls: ['./formulario-datos-personales.component.css']
})
export class FormularioDatosPersonalesComponent implements OnInit {
  form:FormGroup;
  private urlApi= "/api/persona";
  misDatos:any=[];
 





  constructor(private http:HttpClient,
    private toastr:ToastrService
    ,private personaService:PersonaService,
     private formBuilder:FormBuilder) {

       http.get(this.urlApi+"/ver").subscribe(data=>{
        this.misDatos=data;

      }) 

      this.form= this.formBuilder.group({
        nombre:[''],
        apellido:['']
      })
   
   
    } 

  ngOnInit(): void {
  }


}
