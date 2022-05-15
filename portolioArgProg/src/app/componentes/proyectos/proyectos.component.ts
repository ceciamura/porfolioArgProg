import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  misDatos:any=[];
  ulogged:string="";
  rutaapi="/api/";

  constructor(private http:HttpClient, private loginService:LoginService) { 

    http.get(this.rutaapi+"proyecto/ver").subscribe(data=>{
      this.misDatos=data;
      
     })
  }

  ngOnInit(): void {
    this.ulogged= this.loginService.getUserLogged();
  }


}
