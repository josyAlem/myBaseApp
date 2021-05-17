import { Component, OnInit } from '@angular/core';
import { CategoryService } from "../category.service";
import { Router, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { LoadingController } from '@ionic/angular';
import * as _ from 'underscore';
import { formSubmitType } from '@nest/nest-enums';
import { Location } from '@angular/common';
import { CategoryModel } from '../category-model/category.model';
import { AlertService, NetworkService } from '@nest/core';

@Component({
  templateUrl: './category-editor.page.html',
})
export class CategoryEditorPage implements OnInit {

  categorysModel: nest.IDataModel = CategoryModel;
  categoryFormData: any;
  _formSubmitType: formSubmitType;
  _currentRecordId: string;

  constructor(
    private netwSvc:NetworkService,
    private _location:Location,
    private _route: ActivatedRoute,
    private _categorysSvc: CategoryService,
    private alertSvc: AlertService,
    private _ldCtrl: LoadingController
  ) {
    this.initVariables();
  }

  ngOnInit() {

    this.initCategoryForm();
  }
  initVariables() {
    this.categoryFormData = { isActive: true };
    this._formSubmitType = formSubmitType.NEW;
    this._currentRecordId = "";
  }

  
  initCategoryForm(): void {
    this.initVariables();

    this._currentRecordId = this._route.snapshot.params['id'];
    if (this._currentRecordId != null && Number(this._currentRecordId) != 0) {
            this._categorysSvc.getById(this._currentRecordId)
            .subscribe(currentData => {
              if (currentData != null) {
                this.categoryFormData = currentData;
            this._formSubmitType = formSubmitType.UPDATE;
              }
            },
              errs => console.log(errs));
           }
  }

  onNavigateBack(): void {
    this._location.back();
  }

  onSubmitForm(formData: JSON) {
    if (this._formSubmitType == formSubmitType.NEW)
      this.saveNew(formData);
    else if (this._formSubmitType == formSubmitType.UPDATE)
      this.updateExisting(formData);

  }
  
  private saveNew(formData: JSON): void {
    if (this.customValidatation(formData) == true) {
      console.log('Saved in actual form: ' + JSON.stringify(formData));

      this._ldCtrl.create({ message: "Saving category...", cssClass: "spinnerCustomClass" })
        .then(c => {
          c.present();
          this._categorysSvc.createNew(formData).then
            (result => {
              this.onNavigateBack();
              this.alertSvc.showSuccess();
              this._ldCtrl.dismiss();
            }, (err) => {
              this.alertSvc.showError({ msg: JSON.stringify(err) });
              this._ldCtrl.dismiss();
            });

        });
    }
  }

  private updateExisting(formData: JSON): void {
    if (this.customValidatation(formData) == true) {
      console.log('Saved in actual form: ' + JSON.stringify(formData));

      this._ldCtrl.create({ message: "Saving category...", cssClass: "spinnerCustomClass" })
        .then(c => {
          c.present();
          this._categorysSvc.updateExisting(formData, this._currentRecordId)
            .then
            (result => {
              this.alertSvc.showSuccess();
              this. onNavigateBack();
              this._ldCtrl.dismiss();
            }
            , (err) => {
              this.alertSvc.showError({ msg: JSON.stringify(err) });
              this._ldCtrl.dismiss();
            });

        });
    }
  }

  private customValidatation(formData: JSON): boolean {
   return true;
   
  }

}
