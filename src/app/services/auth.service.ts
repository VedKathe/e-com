import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
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
    const url = environment.apiUrl + '/auth/login';

    return this.http.post<Config>(url,{email,password});
  }

  validateToken(token:string)
  {

    const url = environment.apiUrl + '/auth/status';
    const headers = { 'Authorization': `Bearer ${token}` }
    return this.http.get(url,{ headers }).pipe(
      catchError((err)=>{
        console.log(err);
        return of(false)
      })
    );
    
  }

  registerUser(user:any){
    const url = environment.apiUrl + '/auth/signup';

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

  verifyEmail(token:string){
    const url = environment.apiUrl + '/auth/verify';
    console.log("verify req send :"+token);
    const payload = {
      token: token
    }
    return this.http.post(url,payload);
  }
}
