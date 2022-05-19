import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/servicios/login.service';
import { PersonaService } from 'src/app/servicios/persona.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule, HttpContext } from '@angular/common/http';

/* interface HardSkill{
  porcentaje!:string;

} */


@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  ulogged:string="";
  softSkillList!:any[];
  formSoftSkills:FormGroup;
  //formHardSkills!:FormGroup;
  accion:string="Agregar";
  id:number| undefined;
  porcentaje!:String;


  constructor( private http: HttpClient,
    private toastr: ToastrService,
    private personaService: PersonaService,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
  
    ) {
      this.formSoftSkills
      =this.formBuilder.group({
        softSkills:['', Validators.required],
     })

     
    }
  /*   get softSkills() {
      return this.formSoftSkills.controls["softSkills"] as FormArray;
    }
 */
  ngOnInit(): void {
    this.ulogged= this.loginService.getUserLogged();
   this.verSoftSkills();
  
  
       
  
  }


 
  
  /*****************HARDSKILLS******************************************************************/
  formHardSkills=this.formBuilder.group({
    porcentaje:new FormControl('', Validators.required),
  })

  ngAfterViewInit(): void {
    this.formHardSkills.get('porcentaje')?.valueChanges.subscribe(data => this.porcentaje = data);
  }

  onFormSubmit():void{
   console.log('Porcentaje:' +this.formHardSkills.get('porcentaje')?.value);
 }

 onPatch(): void {
  this.formHardSkills.patchValue({   porcentaje: '85' });
}
  




  /*****************SOFTSKILLS******************************************************************/

verSoftSkills(){
  this.personaService.verSoftSkills().subscribe(data=>{
    this.softSkillList=data;
     console.log(this.softSkillList) 
    
 })
}
  
guardarSoftSKills() {
    
  const softSkills: any = {
    softSkills: this.formSoftSkills.get('softSkills')?.value,
    
  }
 
  if(this.id==undefined){
    this.personaService.guardarSoftSkills(softSkills).subscribe(data=>{
      this.toastr.success(
        'Soft Skill registrada con exito',
        'Soft Skill registrada'
      );
      this.verSoftSkills();
      this.formSoftSkills.reset();
     })
  }else{
        //editamos
        softSkills.id = this.id;
        this.personaService.actualizarSoftSkills(softSkills).subscribe(data=>{
          this.formSoftSkills.reset();
          this.accion="Editar";
          this.id=undefined;
          this.verSoftSkills();
          this.toastr.info("Soft Skill actualizada con exito", "Soft Skill actualizada");

        }) 
  }
}
eliminarSoftSkills(id: number) {
  this.personaService.eliminarSoftSkills(id).subscribe(data=>{
    
 this.toastr.error('Soft Skill eliminada con exito', 'Soft Skill eliminada');
 this.verSoftSkills();
  })
 }

 editarSoftSkills(softSkills:any){
  //console.log(experiencia)
  this.accion="editar";
  this.id= softSkills.id;
  this.formSoftSkills.patchValue({
    softSkills:softSkills.softSkills,
  })
}



}
