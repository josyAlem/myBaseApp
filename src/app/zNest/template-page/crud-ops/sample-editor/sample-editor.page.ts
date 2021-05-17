import { Component, OnInit } from '@angular/core';
import { CrudOpsService } from "../crud-ops.service";
import { Router, ActivatedRoute } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { LoadingController } from '@ionic/angular';
import * as _ from 'underscore';
import { formSubmitType } from '@nest/nest-enums';
import { Location } from '@angular/common';
import { SampleModel } from '../sample-model/sample.model';
import { AlertService, NetworkService } from '@nest/core';
import { take } from 'rxjs/operators';
import { getSampleData } from '../sample-model/sample.dto';

@Component({
  templateUrl: './sample-editor.page.html',
})
export class SampleEditorPage implements OnInit {

  samplesModel: nest.IDataModel = SampleModel;
  sampleFormData: any;
  _formSubmitType: formSubmitType;
  _currentRecordId: string;

  constructor(
    private netwSvc:NetworkService,
    private _location:Location,
    private _route: ActivatedRoute,
    private _samplesSvc: CrudOpsService,
    private alertSvc: AlertService,
    private _ldCtrl: LoadingController
  ) {
    this.initVariables();
  }

  ngOnInit() {

    this.initSampleForm();
  }
  initVariables() {
    this.sampleFormData = { isActive: true };
    this._formSubmitType = formSubmitType.NEW;
    this._currentRecordId = "";
  }

  
  initSampleForm(): void {
    this.initVariables();

    this._currentRecordId = this._route.snapshot.params['id'];
    if (this._currentRecordId != null && Number(this._currentRecordId) != 0) {
      this.netwSvc.isOffline.pipe(take(1)).subscribe(networkResult=>{
        if(networkResult==false)
           {
            this._samplesSvc.getById(this._currentRecordId)
            .subscribe(currentData => {
              if (currentData != null) {
                this.sampleFormData = currentData;
            this._formSubmitType = formSubmitType.UPDATE;
              }
            },
              errs => console.log(errs));
           }
            else {
                let currentData=getSampleData().find(c=>c.id==this._currentRecordId);
                if (currentData != null) {
                  this.sampleFormData = currentData;
                  this._formSubmitType = formSubmitType.UPDATE;
                }
                }
            });
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

      this._ldCtrl.create({ message: "Saving sample...", cssClass: "spinnerCustomClass" })
        .then(c => {
          c.present();
          this._samplesSvc.createNew(formData).then
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

      this._ldCtrl.create({ message: "Saving sample...", cssClass: "spinnerCustomClass" })
        .then(c => {
          c.present();
          this._samplesSvc.updateExisting(formData, this._currentRecordId)
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
    var valid: boolean = true;
    if (formData["name"] == "" || isNullOrUndefined(formData["name"]))
      valid = false;
    if (formData["userName"] == "" || isNullOrUndefined(formData["userName"]))
      valid = false;
    if (!valid)
      this.alertSvc.showWarning({ msg: "Invalid" });
    return valid;
  }

}
