import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CrudOpsPage } from './crud-ops.page';
import { CrudOpsService } from './crud-ops.service';
import { NestSharedModule } from '@nest/nest-shared.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: CrudOpsPage },
  {
    path: 'editor/:id',
    loadChildren: () => import('./sample-editor/sample-editor.module').then(m => m.SampleEditorPageModule)
  },
  {
    path: 'detail/:id',
    loadChildren: () => import('./sample-detail/sample-detail.module').then(m => m.SampleDetailPageModule)
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
  declarations: [CrudOpsPage],
  providers: [CrudOpsService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

})
export class CrudOpsPageModule { }
