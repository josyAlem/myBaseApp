import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LocationPickerPresenter, MapModalComponent,    ImagePickerPresenter} from '@nest/core/presenters'
import{TmplDataGridComponent, TmplFormComponent,    CommonHeaderViewComponent} from '@nest/core/templates'
    import {FirestoreCrudService,    GoogleMapsService, CallMakerService,AlertService, NavigationService, NetworkService
} from '@nest/core/services';

import { NestFilterPipe } from '@nest/core/pipes';

import {MatNativeDateModule} from '@angular/material/core';
import { NestNgMaterialModule } from '@nest/nest-ng-material.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        NestNgMaterialModule
    ],
    declarations: [
        TmplDataGridComponent,
        TmplFormComponent,
        CommonHeaderViewComponent,
        LocationPickerPresenter,
        ImagePickerPresenter,
        MapModalComponent,
        NestFilterPipe],
    exports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        NestNgMaterialModule,
        TmplDataGridComponent,
        CommonHeaderViewComponent,
        TmplFormComponent,
        LocationPickerPresenter,
        ImagePickerPresenter,
        MapModalComponent
    ],
    providers: [
        AlertService,
        FirestoreCrudService,
        GoogleMapsService,
        CallMakerService,
        NavigationService,
        NetworkService],

    entryComponents: [MapModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class NestSharedModule {


}