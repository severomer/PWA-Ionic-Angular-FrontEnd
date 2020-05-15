import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'event',
    loadChildren: () => import('./event/event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'greeting',
    loadChildren: () => import('./greeting/greeting.module').then( m => m.GreetingPageModule)
  },
  {
    path: 'edetail/:eventId',
    loadChildren: () => import('./edetail/edetail.module').then( m => m.EdetailPageModule)
  },
  {
    path: 'invite/:eventId',
    loadChildren: () => import('./invite/invite.module').then( m => m.InvitePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
