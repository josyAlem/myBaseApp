import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NestSharedModule } from '@nest/nest-shared.module';
import { Routes, RouterModule } from '@angular/router';
import { PickerPage } from './picker.page';
const routes: Routes = [
  {
    path: '',
    component: PickerPage
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
  declarations: [PickerPage]
})
export class PickerPageModule {}
