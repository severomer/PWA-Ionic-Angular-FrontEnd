import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service'
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.page.html',
  styleUrls: ['./greeting.page.scss'],
})
export class GreetingPage implements OnInit {

  constructor(private apiService: ApiService, private  router:  Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  greeting(form){
    this.apiService.sendGreeting(form.value)
    .then((res)=>{
      console.log('inside Send Greeting')
      this.showToastMessage('Greeting Sent')
     // console.log(res.message)
 //     console.log(res.user.access_token)
 //     console.log(res.user.id)
 //     console.log(res.user.name)
      this.router.navigateByUrl('home');
    });
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
