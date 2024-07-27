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
    const url = 'https://e-comm-api/auth/login';

    return this.http.post<Config>(url,{email,password});
  }

  validateToken(token:string)
  {

    const url = 'https://e-comm-api/auth/status';
    const headers = { 'Authorization': `Bearer ${token}` }
    return this.http.get(url,{ headers }).pipe(
      catchError((err)=>{
        console.log(err);
        return of(false)
      })
    );
    
  }

  registerUser(user:any){
    const url = 'https://e-comm-api/auth/signup';

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
