import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PersonaService } from 'src/app/servicios/persona.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService} from 'ngx-toastr';
import { RouterModule, Router} from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

 misDatos:any;
 ulogged:string="";
 rutaapi="/api/persona";
 reloadOnSearch=false;

  constructor(private routes:Router,private loginService:LoginService, private http:HttpClient, private formBuilder:FormBuilder,
    private toastr:ToastrService
    ,private personaService:PersonaService) { 
    
 http.get(this.rutaapi+"/ver").subscribe(data=>{
      this.misDatos=data;
      
   
    })

  }


  
   ngOnInit(): void {


this.ulogged= this.loginService.getUserLogged();
  }

  verPersonas():void{
    console.log(this.misDatos)
    //this.routes.navigate(["formularioPersona"]);
   }

   
  salir():void{
    this.loginService.deleteToken();
    this.ulogged="";
    window.location.reload();

  }
 

  
}


