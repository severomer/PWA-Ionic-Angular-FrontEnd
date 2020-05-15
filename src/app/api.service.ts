import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Greeting, Event } from './auth/user';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { tap, switchMap, map } from  'rxjs/operators';

import { Storage } from  '@ionic/storage';
import { SERVER_ADDRESS } from "./constants";
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  TOKEN: string;
  USERNAME: string;
  USERID: number;
  stringUID : String;

  event:Event;
  events : Event [] = [];

  //API_SERVER_ADDRESS:  string  =  'http://34.72.111.93:8080/api';
  API_SERVER_ADDRESS = SERVER_ADDRESS;

  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { }
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

  async getEvent(e:number){
  this.TOKEN = await this.getToken();
  const headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.TOKEN })
    
  return this.httpClient.get<any>(`${this.API_SERVER_ADDRESS}/event/${e}`, { headers }).subscribe(res => {
     this.events.push(res);
     console.log(event); 
     console.log(this.events);
     console.log(this.events[this.events.length - 1]);
     
 })

 // return (this.events[this.events.length - 1]);
}

// Not working observable icinde Promise olmuyor
  getByEvent(e:number){
   from (this.getToken()).pipe(
     switchMap(access_token => {
  const headers = new HttpHeaders({ 'Authorization': 'Bearer' + access_token })
    
  return this.httpClient.get<Event>(`${this.API_SERVER_ADDRESS}/event/${e}`, { headers })
     }),
  map(response =>
    console.log(response)
  )
   )
     }

  async sendGreeting(greeting:Greeting){

    this.TOKEN = await this.getToken();
    console.log('Token is:');
    // console.log(this.getToken());
    console.log(this.TOKEN);
  
    this.USERNAME= await this.getUsername();
  
    this.USERID= await this.getUserid();

    
    //this.stringUID = this.USERID.toString();
    
    const headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.TOKEN })
    
   return this.httpClient.post<any>(`${this.API_SERVER_ADDRESS}/greeting/${this.USERID}/33`, greeting, { headers }).subscribe(res => {
    //  this.greetings.push(res)
      console.log(res)
    //  console.log(this.greetings);
    //  console.log(this.greetings[0][2]);
  })
  }

  async newEvent(event:Event){

    this.TOKEN = await this.getToken();
    console.log('Event Token is:');
    // console.log(this.getToken());
    console.log(this.TOKEN);
  
    this.USERNAME= await this.getUsername();
  
    this.USERID= await this.getUserid();

    
    //this.stringUID = this.USERID.toString();
    
    const headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.TOKEN })
    
   return this.httpClient.post<any>(`${this.API_SERVER_ADDRESS}/event/${this.USERID}`, event, { headers }).subscribe(res => {
    //  this.greetings.push(res)
      console.log(res)
    //  console.log(this.greetings);
    //  console.log(this.greetings[0][2]);
  })
  }

  sendGreetingAuto(value: any) : Observable<Greeting>{
    return null;
    throw new Error("Method not implemented.");
  }


}
