 import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { InfoComponent } from './componentes/info/info.component';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { HabilidadesComponent } from './componentes/habilidades/habilidades.component';
import { IdiomasComponent } from './componentes/idiomas/idiomas.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { LoginComponent } from './componentes/login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { FormularioDatosPersonalesComponent } from './componentes/formulario-datos-personales/formulario-datos-personales.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InfoComponent,
    ProyectosComponent,
    HabilidadesComponent,
    IdiomasComponent,
    FooterComponent,
    LoginComponent,
    PortfolioComponent,
    FormularioDatosPersonalesComponent,
   
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({}),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
   
   
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
