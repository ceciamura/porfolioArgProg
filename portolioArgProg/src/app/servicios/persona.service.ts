import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { ExperienciaLaboral } from '../experiencia-laboral';
import { map } from 'rxjs/operators';



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


  /*----------------------servicio tipo experiencia*--------------------------------------------**/



/* verTipo():Observable<any>{
  return this.http.get(this.api + "tipoTrabajo/ver")
} */
 getTipo(): Observable<ExperienciaLaboral[]> {
  return this.http.get(this.api + "tipoTrabajo/ver").pipe(
    map(tipos => tipos as ExperienciaLaboral[])
  );
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


}
