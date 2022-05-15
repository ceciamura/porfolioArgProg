import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { RouterModule, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailUsuario: string = "";
  contrasenia: string = "";
  loginError: string = "";

 

  constructor(private LoginService:LoginService, private routes:Router ) { }

  login(){
  

    const user = {emailUsuario: this.emailUsuario, contrasenia: this.contrasenia};


    this.LoginService.login(user).subscribe(data =>{
      console.log(data);

      if(data==null) this.loginError="Error! Usuario no registrado";
      else{
        this.loginError="";
        this.LoginService.setToken(data.id);
        this.routes.navigate(["portfolio"]);
        //window.location.reload();



      }

    })
  }
  ngOnInit(): void {
  }

}
