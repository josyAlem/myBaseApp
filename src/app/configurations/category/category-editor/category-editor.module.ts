import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NestSharedModule } from '@nest/nest-shared.module';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { CategoryEditorPage } from './category-editor.page';

const routes: Routes = [
  {    path: '',    component: CategoryEditorPage  }
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
  declarations: [CategoryEditorPage]
})
export class CategoryEditorPageModule {}
