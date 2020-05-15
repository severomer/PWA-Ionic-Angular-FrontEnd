import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EdetailPageRoutingModule } from './edetail-routing.module';

import { EdetailPage } from './edetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EdetailPageRoutingModule
  ],
  declarations: [EdetailPage]
})
export class EdetailPageModule {}
