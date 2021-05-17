import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { CategoryPage } from './category.page';
import { RouterModule, Routes } from '@angular/router';
import { CategoryService } from './category.service';
const routes: Routes = [
  {
    path: '',
    component: CategoryPage
  },
  {
    path: 'editor/:id',
    loadChildren: () => import('./category-editor/category-editor.module').then(m => m.CategoryEditorPageModule)
  },
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  providers: [CategoryService],
  declarations: [CategoryPage]
})
export class CategoryPageModule {}
