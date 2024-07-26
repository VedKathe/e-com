import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';

interface Config {
  token: string;
  user: any;
}


@Injectable({
  providedIn: 'root'
})


export class AuthService {
  
  constructor(private http: HttpClient) { }

  getLogin(email:string,password:string) {
    const url = 'http://hollow-felita-weoto-170346d6.koyeb.app/auth/login';

    return this.http.post<Config>(url,{email,password});
  }

  validateToken(token:string)
  {

    const url = 'http://hollow-felita-weoto-170346d6.koyeb.app/auth/status';
    const headers = { 'Authorization': `Bearer ${token}` }
    return this.http.get(url,{ headers }).pipe(
      catchError((err)=>{
        console.log(err);
        return of(false)
      })
    );
    
  }

  registerUser(user:any){
    const url = 'http://hollow-felita-weoto-170346d6.koyeb.app/auth/signup';

    return this.http.post<any>(url,user);
  }

  isLoggedIn(){

    if( typeof(localStorage) !== "undefined")
      {
        return localStorage.getItem("token") != null;
      }
      else{
        return false;
      
      }
    }
    

  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }
}
