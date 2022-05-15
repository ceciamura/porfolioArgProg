import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {

  ulogged:string="";


  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.ulogged= this.loginService.getUserLogged();
  }

}
