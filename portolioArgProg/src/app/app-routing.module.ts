import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { LoginComponent } from './componentes/login/login.component';
import { FormularioDatosPersonalesComponent } from './componentes/formulario-datos-personales/formulario-datos-personales.component';

const routes: Routes = [
  {path: "portfolio", component: PortfolioComponent},
  {path: "login", component: LoginComponent},
  {path: "login/:id", component: LoginComponent},
  {path: "formularioPersona", component:FormularioDatosPersonalesComponent}, 
  {path: "", redirectTo: "portfolio", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
