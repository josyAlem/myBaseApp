import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TemplatePageComponent } from './template-page.component';
import { NestSharedModule } from '@nest/nest-shared.module';
import { TemplatePageRoutingModule } from './template-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NestSharedModule,
    TemplatePageRoutingModule
  ],
  declarations: [TemplatePageComponent]
})
export class TemplatePageModule {}
