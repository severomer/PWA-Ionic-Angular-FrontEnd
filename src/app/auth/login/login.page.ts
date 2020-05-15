import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../auth.service';
//import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private  authService:  AuthService, private  router:  Router) { }

  ngOnInit() {
  }
  login(form){
    this.authService.login(form.value)
    .subscribe((res)=>{
      console.log('inside login')
      console.log(res.user)
 //     console.log(res.user.access_token)
 //     console.log(res.user.id)
 //     console.log(res.user.name)
      this.router.navigateByUrl('home');
    });

  }
}
