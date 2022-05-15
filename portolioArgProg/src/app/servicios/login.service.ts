import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

private url= "/api/user/";
private url2="/api/";

  constructor(private http:HttpClient, private cookies:CookieService) { }

  login(Users:any): Observable<any>{
    return this.http.post(this.url+ "login" , Users);
  }

  getUser(id:number):Observable<any>{
    return this.http.get(this.url+"/"+id);
  }

  //TOKEN

  setToken(token:string){
    this.cookies.set("token", token);
  }

  getToken(){
    return this.cookies.get("token");
  }

  deleteToken(){
    this.cookies.delete("token");
  }

  getUserLogged(){
    const token = this.getToken();
    return token;
  }

  obtenerDatos():Observable<any>{
    return this.http.get(this.url+"/ver");
  }

  
}
