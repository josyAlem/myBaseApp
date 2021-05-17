import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplatePageComponent } from './template-page.component';

const routes: Routes = [
  {
    path: '',    component: TemplatePageComponent
      },
    {
      path: 'pickers',
      loadChildren: () => import('./picker/picker.module').then(m => m.PickerPageModule)
    },
    {
      path: 'call-sms',
      loadChildren: () => import('./call-sms/call-sms.module').then(m => m.CallSmsPageModule)
    },
    {
      path: 'form-control',
      loadChildren: () => import('./form-control/form-control.module').then(m => m.FormControlPageModule)
    },
    {
      path: 'crud-ops',
      loadChildren: () => import('./crud-ops/crud-ops.module').then(m => m.CrudOpsPageModule)
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemplatePageRoutingModule {}
