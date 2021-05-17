import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ConfigurationsPage } from './configurations.page';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: ConfigurationsPage
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then( m => m.CategoryPageModule)
  },
  {
    path: 'item',
    loadChildren: () => import('./item/item.module').then( m => m.ItemPageModule)
  },
  {
    path: 'unit',
    loadChildren: () => import('./unit/unit.module').then( m => m.UnitPageModule)
  },
  {
    path: 'expense-type',
    loadChildren: () => import('./expense-type/expense-type.module').then( m => m.ExpenseTypePageModule)
  }

];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ConfigurationsPage]
})
export class ConfigurationsPageModule {}
