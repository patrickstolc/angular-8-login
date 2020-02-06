import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  workspace = 'https://amazing-sinoussi-00315a.busywork.ai';
  jsonHeader = {headers: new HttpHeaders({'Content-Type':  'application/json'})};

  constructor(private http: HttpClient, private router: Router) { }

  // try to get the access token
  getAccessToken(){
    return localStorage.getItem('user_access_token');
  }

  // sign up
  signUp(username:string, password:string){
    return this.http.post(
      this.workspace + '/sample-sign-up',
      // body content - required args can be seen in the Busywork function
      JSON.stringify({
        'username': username,
        'password': password
      }),
      this.jsonHeader
    );
  }

  // sign in
  signIn(username:string, password:string){
    return this.http.post(
      this.workspace + '/sample-sign-in',
      // body args
      {
        'username': username,
        'password': password
      },
      this.jsonHeader
    ).subscribe(
      (result:any) => {
        // save the access token in local storage
        localStorage.setItem('user_access_token', result['data']['access_token']);
        // change route to the profile component
        this.router.navigate(['profile']);
      }
    )
  }

  // sign out
signOut(){
  return this.http.post(
    this.workspace + '/sample-sign-out',
    {},
    this.jsonHeader
  ).subscribe(
    (result:any) => {
      this.router.navigate(['sign-in']);
    }
  )
}

  // authenticate - checks if the users token is valid
authenticate(){
  return this.http.post(
    this.workspace + '/sample-authenticate',
    {},
    this.jsonHeader
  );
}
}
