import { Component } from '@angular/core';
import { LoginPageRoutingModule } from '../auth/login/login-routing.module';
import { AuthService} from '../auth/auth.service'
import { Observable, from } from 'rxjs';
import { HttpClient, HttpRequest, HttpHeaders } from  '@angular/common/http';
import { Storage } from  '@ionic/storage';
import { Greeting } from '../auth/user';
import { Router } from  "@angular/router";
import { NavController } from '@ionic/angular';
import { User, CrmUser } from  '../auth/user';
import { SERVER_ADDRESS } from "../constants";
//import 'rxjs/add/operator/mergeMap';
//import { from } from 'rxjs/add/observable/from';
//import { RequestOptions } from 'http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

 // SERVER_ADDRESS:  string  =  'http://34.72.111.93:8080/api';
 SERVER_ADDRESS = SERVER_ADDRESS;

  greetings : Greeting [] = []
  events : Event [] = []

  eventDetail:number;

  TOKEN: string;
  USERNAME: string;
  USERID: number;

 // requestOptions : RequestOptions;
  isLogged : Observable<boolean>;
  observable : Observable<any>;
 // isLogged : boolean;

  constructor(private  httpClient:  HttpClient, 
              private  storage:  Storage, 
              private  authService:  AuthService,
              private router : Router,
              private nav: NavController
              ) {}

ngOnInit(){
  this.isLogged=this.authService.isLoggedIn();
}

clearLists(){
  this.events = [];
  this.greetings = [];
}

getEventDetail(){
return this.eventDetail;
}

setEventDetail(e:number){
  this.eventDetail = e;
  }

goGreetingPage(){
  this.router.navigateByUrl('greeting');
}

goEventPage(){
  this.router.navigateByUrl('event');
}

eDetails(e){
  console.log(e);
  this.setEventDetail(e);
  this.nav.navigateForward(`edetail/${e}`);
}

inviteUp(e){
  console.log(e);
  this.setEventDetail(e);
  this.nav.navigateForward(`invite/${e}`);
}
homelogout(){
  this.authService.logout();
}

async homeisauth(){
  console.log(this.authService.isLoggedIn());

 // return this.authService.isLoggedIn();
 return this.isLogged;
}

private getAuthHeaders() {
  let promise = this.storage.get("ACCESS_TOKEN");
  return from(promise)
}
private  getToken() {
  let promise =  this.storage.get("ACCESS_TOKEN");
  return promise.then(value => {this.TOKEN=value
  return value})
}
private  getUsername() {
  let promise =  this.storage.get("USERNAME");
  return promise.then(value => {this.USERNAME=value
  return value})
}
private  getUserid() {
  let promise =  this.storage.get("USERID");
  return promise.then(value => {this.USERID=value
  return value})
}

goGuestPage(){
  // restlogin requires 2 fields: username, password but login requires user all fields
  let guestUser:User = {username: "Guest", password: "password", name:"First", id:9, email:"guest@com"};
  //{username: "Guest", password: "password", name:"First", id:9, email:"guest@com"};
  
  this.authService.login(guestUser)
  .subscribe((res)=>{
    console.log('inside Guest')
    console.log(res.user)
//     console.log(res.user.access_token)
//     console.log(res.user.id)
//     console.log(res.user.name)
    this.router.navigateByUrl('home');
  });

}
async homeGetMyGreeting(){

  this.clearLists();
  this.TOKEN = await this.getToken();
  console.log('Token is:');
  // console.log(this.getToken());
  console.log(this.TOKEN);

  this.USERNAME= await this.getUsername();

  const headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.TOKEN })
  
 return this.httpClient.get<any>(`${this.SERVER_ADDRESS}/greetings/${this.USERNAME}`, { headers }).subscribe(res => {
    this.greetings.push(res)
    console.log(res)
    console.log(this.greetings);
    console.log(this.greetings[0][2]);
})
}

  async homeGetGreeting(){

  //var headers = new Headers();
  //headers.append("Accept", 'application/json');
  //headers.append('Content-Type', 'application/json' );
  //const requestOptions = new RequestOptions({ headers: headers });
  this.clearLists();
  this.TOKEN = await this.getToken();
  console.log('Token is:');
  // console.log(this.getToken());
  console.log(this.TOKEN);

  const headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.TOKEN })
  
 return this.httpClient.get<any>(`${this.SERVER_ADDRESS}/greetings`, { headers }).subscribe(res => {
    this.greetings.push(res)
    console.log(res)
    console.log(this.greetings);
    console.log(this.greetings[0][2]);
})

console.log(this.greetings);





/*
let requestOptions = Object.assign({

});
*/

/*
this.httpClient.request( new HttpRequest("GET", `${this.SERVER_ADDRESS}/greetings`, requestOptions) ).subscribe(res => {
  console.log(res)
});
*/
/*
return this.getAuthHeaders().subscribe( api_token => {

  if( api_token ) {
    // add Authorization header
  //  requestOptions.headers.append('Authorization', 'Bearer ' + api_token);
  }
  
  // make request 
  return this.httpClient.request( new HttpRequest("GET", `${this.SERVER_ADDRESS}/greetings`, requestOptions) );
});
*/
}




async homeGetEvent(){

  //var headers = new Headers();
  //headers.append("Accept", 'application/json');
  //headers.append('Content-Type', 'application/json' );
  //const requestOptions = new RequestOptions({ headers: headers });
  this.clearLists();
  this.TOKEN = await this.getToken();
  console.log('Token is:');
  // console.log(this.getToken());
  console.log(this.TOKEN);

  const headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.TOKEN })
  
 return this.httpClient.get<any>(`${this.SERVER_ADDRESS}/allevents`, { headers }).subscribe(res => {
    this.events.push(res)
    console.log(res)
    console.log(this.events);
    console.log(this.events[0][1]);
})
}


async homeGetMyEvent(){

  //var headers = new Headers();
  //headers.append("Accept", 'application/json');
  //headers.append('Content-Type', 'application/json' );
  //const requestOptions = new RequestOptions({ headers: headers });
  this.clearLists();
  this.TOKEN = await this.getToken();
  console.log('Token is:');
  // console.log(this.getToken());
  console.log(this.TOKEN);

  this.USERID= await this.getUserid();

  const headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.TOKEN })
  
 return this.httpClient.get<any>(`${this.SERVER_ADDRESS}/allevents/${this.USERID}`, { headers }).subscribe(res => {
    this.events.push(res)
    console.log(res)
    console.log(this.events);
    console.log(this.events[0][1]);
})
}


async delete(id:number){

  // var idnum : number
  // idnum = id.valueOf();

  var idstr : String ;
  idstr = id.toString();
  
  this.TOKEN = await this.getToken();
  console.log('Delete Token is:');
  // console.log(this.getToken());
  console.log(this.TOKEN);

  this.USERID= await this.getUserid();

  const headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.TOKEN })
  
 return this.httpClient.delete<any>(`${this.SERVER_ADDRESS}/greeting/${idstr}`, { headers }).subscribe(res => {
    console.log(res)
    // console.log(this.events);
   // console.log(this.events[0][1]);
})
}

}
