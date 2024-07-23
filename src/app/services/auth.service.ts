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
    const url = 'http://localhost:3000/auth/login';

    return this.http.post<Config>(url,{email,password});
  }

  validateToken(token:string)
  {
    
    const url = 'http://localhost:3000/auth/status';
    const headers = { 'Authorization': `Bearer ${token}` }
    return this.http.get(url,{ headers }).pipe(
      catchError((err)=>{
        console.log(err);
        return of(false)
      })
    );
    
  }
}
