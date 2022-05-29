import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { RouterModule, Router} from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailUsuario: string = "";
  contrasenia: string = "";
  loginError: string = "";

  formLogin:FormGroup;

 

  constructor(private LoginService:LoginService,
              private routes:Router,
              private formBuilder: FormBuilder,
              private _snackBar: MatSnackBar ) {

                this.formLogin=this.formBuilder.group({
                  emailUsuario:['', Validators.required],
                  contrasenia:['', Validators.required],
               })
              }

  login(){
  

    const user = {emailUsuario: this.emailUsuario, contrasenia: this.contrasenia};


    this.LoginService.login(user).subscribe(data =>{
      console.log(data);

      if(data==null){
        this.loginError="Error! Usuario no registrado";
        this.error()
      }
       else{
        this.loginError="";
        this.LoginService.setToken(data.id);
        this.routes.navigate(["portfolio"]);
        window.location.reload();



      }
    
    })
    
  }
  ngOnInit(): void {
  }


  error(){
    this._snackBar.open('Usuario o contraseña ingresados incorrectos', '', {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration:3000
    })
  }
}
