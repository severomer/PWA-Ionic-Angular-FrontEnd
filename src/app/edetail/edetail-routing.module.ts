import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EdetailPage } from './edetail.page';

const routes: Routes = [
  {
    path: '',
    component: EdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EdetailPageRoutingModule {}
