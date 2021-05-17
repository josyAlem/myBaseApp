import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NestSharedModule } from '@nest/nest-shared.module';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { SampleEditorPage } from './sample-editor.page';

const routes: Routes = [
  {    path: '',    component: SampleEditorPage  }
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
  declarations: [SampleEditorPage]
})
export class SampleEditorPageModule {}
