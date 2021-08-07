import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { SampleDetailPage } from './sample-detail.page';
import { NestSharedModule } from '@nest/nest-shared.module';

const routes: Routes = [
  {
    path: '',
    component: SampleDetailPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NestSharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [SampleDetailPage]
})
export class SampleDetailPageModule {}
