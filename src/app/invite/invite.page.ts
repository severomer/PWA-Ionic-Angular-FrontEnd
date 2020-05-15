import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from  '@ionic/storage';
import { Invite } from '../auth/user';
import { SERVER_ADDRESS } from "../constants";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.scss'],
})
export class InvitePage implements OnInit {

  eventId: number;
 
  TOKEN: string;
  USERNAME: string;
  USERID: number;
  stringUID : String;

  event:Event;
  events : Event [] = [];

  invites : Invite [] = [];

  attend:false;
  showNew:Boolean = false;

  // attended:false;

  //API_SERVER_ADDRESS:  string  =  'http://34.72.111.93:8080/api';
  API_SERVER_ADDRESS = SERVER_ADDRESS;

  constructor(private  httpClient:  HttpClient, private  storage:  Storage, private route:ActivatedRoute, private apiService:ApiService) { }
  private  getToken() {
    let promise =  this.storage.get("ACCESS_TOKEN");
    return promise.then(value => {this.TOKEN=value
    return value})
  }
  async ngOnInit() {
    this.eventId = +this.route.snapshot.params['eventId'];

    this.TOKEN = await this.getToken();
  const headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.TOKEN })
    
   this.httpClient.get<any>(`${this.API_SERVER_ADDRESS}/invite/${this.eventId}`, { headers }).subscribe(res => {
     this.invites.push(res);
     console.log(this.invites); 
     //console.log(this.events);
     console.log(this.invites[this.invites.length - 1]);
     
 })
  
  }

  async saveEvent(){
    this.TOKEN = await this.getToken();
    const headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.TOKEN })
    this.httpClient.post<any>(`${this.API_SERVER_ADDRESS}/invites/${this.eventId}`, this.invites[0], { headers }).subscribe(res => {
      //  this.greetings.push(res)
        console.log(res)
      //  console.log(this.greetings);
      //  console.log(this.greetings[0][2]);
    })
  }

}
