import { Injectable } from  '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';

import { Storage } from  '@ionic/storage';
import { User, CrmUser } from  './user';
import { AuthResponse } from  './auth-response';
import { SERVER_ADDRESS } from "../constants";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 // AUTH_SERVER_ADDRESS:  string  =  'http://34.72.111.93:8080/api';
 AUTH_SERVER_ADDRESS = SERVER_ADDRESS;
 
 authSubject  =  new  BehaviorSubject(false); //Promise<boolean>;//
// authSubject  : boolean;

  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { }


  register(user: CrmUser): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
      tap(async (res:  AuthResponse ) => {

        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })

    );
  }

  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/restlogin`, user).pipe(
      tap(async (res: AuthResponse) => {

        console.log('inside auth.service.login');
        console.log(res.user.name)
        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          console.log(res.user.access_token)
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
          await this.storage.set("USERNAME", res.user.username);
          console.log(res.user.username)
          await this.storage.set("USERID", res.user.id);
          console.log(res.user.id)
     //this.authSubject=true;
        }
      })
    );
  }

 /* 
  login(user: User): Observable<Headers> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/restlogin`, user).
    pipe(
      tap(async (res: Headers) => {

        console.log('inside auth.service.login');
        console.log(res)
        console.log(res.get)
        if (res) {
         // await this.storage.set("ACCESS_TOKEN", res.user.access_token);
         // await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })
    );
  }
*/
  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    this.authSubject.next(false);
  // this.authSubject=false;
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }

}
