import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service'
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  conf:true;
  // displayValue: Boolean = false;
  constructor(private apiService: ApiService, private  router:  Router, private toastController: ToastController) { }

  ngOnInit() {
  }

  event(form){
  //  form.ozel="1";
    this.apiService.newEvent(form.value)
    .then((res)=>{
      console.log('inside New Event')
      this.showToastMessage('Event Created')
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
