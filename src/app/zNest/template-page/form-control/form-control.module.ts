import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormControlPage } from './form-control.page';
import { RouterModule, Routes } from '@angular/router';
import { NestSharedModule } from '@nest/nest-shared.module';

const routes: Routes = [
  {
    path: '',
    component: FormControlPage
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
  declarations: [FormControlPage]
})
export class FormControlPageModule {}
