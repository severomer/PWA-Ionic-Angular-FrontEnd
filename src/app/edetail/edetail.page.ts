import { Component, OnInit } from '@angular/core';
import { HomePage } from '../home/home.page';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from  '@ionic/storage';
import { Invite } from '../auth/user';
import { ToastController } from "@ionic/angular";
import { SERVER_ADDRESS } from "../constants";

@Component({
  selector: 'app-edetail',
  templateUrl: './edetail.page.html',
  styleUrls: ['./edetail.page.scss'],
})
export class EdetailPage implements OnInit {

  eventId: number;
 
  TOKEN: string;
  USERNAME: string;
  USERID: number;
  stringUID : String;

  event:Event;
  events : Event [] = [];

  attend:false;
  showNew:Boolean = false;

  // attended:false;

  //API_SERVER_ADDRESS:  string  =  'http://34.72.111.93:8080/api';
  API_SERVER_ADDRESS = SERVER_ADDRESS;

  constructor(private  httpClient:  HttpClient, private  storage:  Storage, private route:ActivatedRoute, private toastController: ToastController, private apiService:ApiService) { }
  private  getToken() {
    let promise =  this.storage.get("ACCESS_TOKEN");
    return promise.then(value => {this.TOKEN=value
    return value})
  }
  async ngOnInit() {
    this.eventId = +this.route.snapshot.params['eventId'];

    this.TOKEN = await this.getToken();
  const headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.TOKEN })
    
   this.httpClient.get<any>(`${this.API_SERVER_ADDRESS}/event/${this.eventId}`, { headers }).subscribe(res => {
     this.events.push(res);
     console.log(event); 
     console.log(this.events);
     console.log(this.events[this.events.length - 1]);
     
 })
    // this.event = this.apiService.events[this.apiService.events.length - 1]
    
  }

  async createInvite(invite:Invite){
    this.TOKEN = await this.getToken();
    const headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.TOKEN })
    this.httpClient.post<any>(`${this.API_SERVER_ADDRESS}/invite/${this.eventId}`, invite, { headers }).subscribe(res => {
      //  this.greetings.push(res)
        console.log(res)
        this.showToastMessage('Guest Created...');
      //  console.log(this.greetings);
      //  console.log(this.greetings[0][2]);
    })
  }

  async saveEvent(){
    this.TOKEN = await this.getToken();
    const headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.TOKEN })
    this.httpClient.post<any>(`${this.API_SERVER_ADDRESS}/eventsave`, this.events[0], { headers }).subscribe(res => {
      //  this.greetings.push(res)
        console.log(res)
      //  console.log(this.greetings);
      //  console.log(this.greetings[0][2]);
    })
  }

  async eventDelete(){
    this.TOKEN = await this.getToken();
    const headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.TOKEN })
    this.httpClient.delete<any>(`${this.API_SERVER_ADDRESS}/eventsave/${this.eventId}`,  { headers }).subscribe(res => {
      //  this.greetings.push(res)
        console.log(res)
        this.showToastMessage('Event Deleted...');
      //  console.log(this.greetings);
      //  console.log(this.greetings[0][2]);
    })
  }

  async updateInvite(){
    this.TOKEN = await this.getToken();
    const headers = new HttpHeaders({ 'Authorization': 'Bearer' + this.TOKEN })
    this.httpClient.post<any>(`${this.API_SERVER_ADDRESS}/eventsave`, this.events[0], { headers }).subscribe(res => {
      //  this.greetings.push(res)
        console.log(res)
      //  console.log(this.greetings);
      //  console.log(this.greetings[0][2]);
    })
  }

  invite(form){
    console.log(form)
    this.createInvite(form.value)
    console.log('after create invite')
  }

  eventSave(){
    console.log(this.events[0])
    this.saveEvent()
    console.log('after save event')
  }

  changeNewGuest(){
    if (this.showNew) {
      this.showNew = false
    } else {
      this.showNew = true
    }
  }
  
 changeGuest(){
    if (this.showNew) {
      this.showNew = true
    } else {
      this.showNew = false
    }
  }

  getApiNotWorking(){
    this.apiService.getEvent(this.eventId).then(value=> 
      {console.log(value);
      //this.event = value;
    // this.event = await (await this.apiService.getByEvent(this.eventId)).toPromise()
    console.log(this.eventId)
      }
    )
  }

  
  async showToastMessage(msg: string) {
    console.log(msg);
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,

     // showCloseButton: true,
      position: 'top',
     // closeButtonText: 'OK'
    });
    toast.present();
  }
  
}

