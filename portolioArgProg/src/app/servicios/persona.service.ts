import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { ExperienciaLaboral } from '../clases/experiencia-laboral';
import { map } from 'rxjs/operators';
import { Educacion } from '../clases/educacion';




@Injectable({
  providedIn: 'root'
})
export class PersonaService {

private urlApi= "/api/persona";
private api= "/api/"

constructor(private http:HttpClient, private login:LoginService) { }

getPersona(id:number): Observable<any>{
  return this.http.get(this.urlApi+"/"+id)
}
verPersonas(){
 return this.http.get(this.urlApi+"/ver")
}
actualizarPersona(id:number, persona:any):Observable<any>{
  return this.http.put(this.urlApi+"/editar"+id, persona);
}


/*----------------------servicio experiencia laboral*--------------------------------------------**/
verExperiencia():Observable<any>{
  return this.http.get(this.api + "experiencia/ver")
}
eliminarExperiencia(id:number):Observable<any>{
  return this.http.delete(this.api+ "experiencia/delete/"+id)
}
actualizarExperiencia(experiencia:any):Observable<any>{
  return this.http.put(this.api + "experiencia/edit", experiencia)
}
guardarExperiencia(persona:any):Observable<any>{
  return this.http.post(this.api + "experiencia/new", persona)
}


  /*--------servicio tipo experiencia* servicio tipo educacion- *tipoTecnologias-------------------------------------------**/
 getTipo(): Observable<ExperienciaLaboral[]> {
  return this.http.get(this.api + "tipoTrabajo/ver").pipe(
    map(tipos => tipos as ExperienciaLaboral[])
  );
} 
getTipoEducacion(): Observable<Educacion[]> {
  return this.http.get(this.api + "tipoEdu/ver").pipe(
    map(tiposEdu => tiposEdu as Educacion[])
  );
} 

tipoTecnologia():Observable<any>{
  return this.http.get(this.api + "tecnologia/ver")
}


/*----------------------servicio educacion-------------------------------------------------------**/
verEducacion():Observable<any>{
  return this.http.get(this.api + "educacion/ver")
}
verTipoEducacion():Observable<any>{
  return this.http.get(this.api + "nombreTipoEducacion/ver")
}
eliminarEducacion(id:number):Observable<any>{
  return this.http.delete(this.api+ "educacion/delete/"+id)
}

guardarEducacion(persona:any):Observable<any>{
  return this.http.post(this.api + "educacion/new", persona)
}

actualizarEducacion(id:number, persona:any):Observable<any>{
  return this.http.put(this.api + "educacion/editar/"+id, persona)
}

/**************************PROYECTO SERVICE***************************************************** */
verProyecto():Observable<any>{
  return this.http.get(this.api + "proyecto/ver")
}

eliminarProyecto(id:number):Observable<any>{
  return this.http.delete(this.api+ "proyecto/delete/"+id)
}

guardarProyecto(proyecto:any):Observable<any>{
  return this.http.post(this.api + "proyecto/new", proyecto)
}

actualizarProyecto(proyecto:any):Observable<any>{
  return this.http.put(this.api + "proyecto/edit", proyecto)
} 

/**************SOFTSKILLS SERVICE******************************** */

verSoftSkills():Observable<any>{
  return this.http.get(this.api + "soft/ver")
}

eliminarSoftSkills(id:number):Observable<any>{
  return this.http.delete(this.api+ "soft/delete/"+id)
}

guardarSoftSkills(softSkills:any):Observable<any>{
  return this.http.post(this.api + "soft/new", softSkills)
}

actualizarSoftSkills(softSkills:any):Observable<any>{
  return this.http.put(this.api + "soft/edit", softSkills)
} 
/**************HardSKILLS SERVICE******************************** */

verHardSkills():Observable<any>{
  return this.http.get(this.api + "hard/ver")
}

eliminarHardSkills(id:number):Observable<any>{
  return this.http.delete(this.api+ "hard/delete/"+id)
}

guardarHardSkills(hardSkills:any):Observable<any>{
  return this.http.post(this.api + "hard/new", hardSkills)
}

actualizarHardSkills(hardSkills:any):Observable<any>{
  return this.http.put(this.api + "hard/edit", hardSkills)
} 



}


