import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/servicios/login.service';
import { PersonaService } from 'src/app/servicios/persona.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule, HttpContext } from '@angular/common/http';
import { trigger, style, transition, animate, state } from '@angular/animations';






@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css'],
  animations:[
    trigger('enterState', [
      state('void', style({
        transform: 'translateX(-100%)',
        opacity: 0
      })),
      transition(':enter', [
        animate(3000, style({
          transform: 'translateX(0)',
          opacity:1
        }))
      ])
    ])
  ]
})
export class HabilidadesComponent implements OnInit {

  ulogged:string="";
  softSkillList!:any[];
  formSoftSkills:FormGroup;
  formHardSkills:FormGroup;
  accion:string="Agregar";
  id:number| undefined;
  hardSkillList!:any[];
  


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
     
     this.formHardSkills=this.formBuilder.group({
      porcentaje :['', Validators.required],
      logo:['', Validators.required],
     colorExterno:['', Validators.required],
      colorInterno:['', Validators.required]
     })
     
    }

  ngOnInit(): void {
    this.ulogged= this.loginService.getUserLogged();
   this.verSoftSkills()
   this.verPersonas()
   this.verHardSkills()
  
 
   


  
       
  
  }


  verPersonas(){
    this.personaService.verPersonas().subscribe(data=>{
      console.log(data);
    })
  }
  
  verHardSkills(){
    this.personaService.verHardSkills().subscribe(data=>{
      this.hardSkillList=data;
    })
  }





  /*****************SOFTSKILLS******************************************************************/

verSoftSkills(){
  this.personaService.verSoftSkills().subscribe(data=>{
    this.softSkillList=data;
     console.log(this.softSkillList) 
    
 })
}
  
guardarSoftSKills() {
    
  const softSkill: any = {
    softSkills: this.formSoftSkills.get('softSkills')?.value,
  }
    
  if(this.id==undefined){
    this.personaService.guardarSoftSkills(softSkill).subscribe(data=>{
      this.toastr.success(
        'Soft Skill registrada con exito',
        'Soft Skill registrada'
      );
      this.verSoftSkills();
      this.formSoftSkills.reset();
     
     })
  }else{
        //editamos
        softSkill.id = this.id;
        this.personaService.actualizarSoftSkills(softSkill).subscribe(data=>{
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

 editarSoftSkills(softSkill:any){
  //console.log(experiencia)
  this.accion="editar";
  this.id= softSkill.id;
  this.formSoftSkills.patchValue({
    softSkills:softSkill.softSkills,
  })
  
}


/************************HARDSKILL************************************* */

guardarHardSKills() {
    
  const hardSkills: any = {
    porcentaje: this.formHardSkills.get('porcentaje')?.value,
    logo: this.formHardSkills.get('logo')?.value,
    colorExterno: this.formHardSkills.get('colorExterno')?.value,
    colorInterno: this.formHardSkills.get('colorInterno')?.value 
  }
    
 
  if(this.id==undefined){
    this.personaService.guardarHardSkills(hardSkills).subscribe(data=>{
      this.toastr.success(
        'Hard Skill registrada con exito',
        'Hard Skill registrada'
      );
      this.verHardSkills();
      this.formHardSkills.reset();
     
     })
  }else{
        //editamos
        hardSkills.id = this.id;
        this.personaService.actualizarHardSkills(hardSkills).subscribe(data=>{
          this.formSoftSkills.reset();
          this.accion="Editar";
          this.id=undefined;
          this.verHardSkills();
          this.toastr.info("Hard Skill actualizada con exito", "Hard Skill actualizada");

        }) 
  }
}
eliminarHardSkills(id: number) {
  this.personaService.eliminarHardSkills(id).subscribe(data=>{
    
 this.toastr.error('Hard Skill eliminada con exito', 'Hard Skill eliminada');
 this.verHardSkills();
  })
 }

 editarHardSkills(hardSkills:any){
  //console.log(experiencia)
  this.accion="editar";
  this.id= hardSkills.id;
  this.formHardSkills.patchValue({    
    porcentaje:hardSkills.porcentaje,
    logo:hardSkills.logo,
    colorExterno:hardSkills.colorExterno,
    colorInterno:hardSkills.colorInterno
  })
}
/****************animation on scroll************************* */
/* const checkpoint:any = 300;
 
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= checkpoint) {
    this.opacity = 1 - currentScroll / checkpoint;
  } else {
    this.opacity = 0;
  }
  document.querySelector<any>(".textoHardSkill").style.opacity = opacity;
}); */

}
