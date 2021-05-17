import { Injectable } from '@angular/core';
import { ToastController, AlertController, Platform } from '@ionic/angular';
import { alertStyle } from '@nest/nest-enums';
import { IAlertOptions } from '../interfaces';
import { Plugins } from '@capacitor/core';
const { Modals } = Plugins;

@Injectable()
export class AlertService {
  defaultDuration: number = 22500;
  defaultbuttons: any = ['OK'];
  animated: boolean = true;
  keyboardClose: boolean = true;

  constructor(private _toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private platform: Platform
  ) {
  }

  showNativeAlert() {

    return Modals.alert({
      title: 'Stop',
      message: 'this is an error',
    });
  }

  showNativeConfirm() {
    return Modals.confirm({
      title: 'Confirm',
      message: 'Are you sure you\'d like to press the red button?',
    });
  }

  showNativePrompt() {
    return Modals.prompt({
      title: 'Hello',
      message: 'What\'s your name?'
    });
  }


  showSuccess(alertOpts?: IAlertOptions) {
    if (!alertOpts)
      alertOpts = {};

    if (!alertOpts.title)
      alertOpts.title = "Successful";
    if (!alertOpts.position)
      alertOpts.position = "top";
    if (!alertOpts.color)
      alertOpts.color = "success";
    this.display(alertOpts);
  }

  showWarning(alertOpts?: IAlertOptions) {
    if (!alertOpts)
      alertOpts = {};
    if (!alertOpts.title)
      alertOpts.title = "Warning";
    if (!alertOpts.position)
      alertOpts.position = "top";
    if (!alertOpts.color)
      alertOpts.color = "warning";

    this.display(alertOpts);
  }

  showError(alertOpts?: IAlertOptions) {
    if (!alertOpts)
      alertOpts = {};
    if (!alertOpts.title)
      alertOpts.title = "Attention";
    if (!alertOpts.position)
      alertOpts.position = "top";
    if (!alertOpts.color)
      alertOpts.color = "danger";

    this.display(alertOpts);

  }
  showInfo(alertOpts?: IAlertOptions) {
    if (!alertOpts)
      alertOpts = {};
    if (!alertOpts.title)
      alertOpts.title = "Information";
    if (!alertOpts.position)
      alertOpts.position = "top";
    if (!alertOpts.color)
      alertOpts.color = "secondary";

    this.display(alertOpts);

  }

  private display(alertOpts: IAlertOptions) {
    if (this.platform.is('desktop') == true ||
      (!alertOpts.bypassAlertStyle && alertOpts.bypassAlertStyle == alertStyle.TOASTCTRL)) {
      this._toastCtrl.create({
        header: alertOpts.title,
        message: alertOpts.msg,
        color: alertOpts.color,
        buttons: this.defaultbuttons,
        position: alertOpts.position,
        cssClass: alertOpts.position == "top" ? "toast-custom-top-style" : "",
        duration: this.defaultDuration,
        animated: this.animated,
        keyboardClose: this.keyboardClose,
        id: alertOpts.id
      }).then(t => t.present());
    } else if (this.platform.is('desktop') == false || (!alertOpts.bypassAlertStyle && alertOpts.bypassAlertStyle == alertStyle.ALERTCTRL)) {
      this.alertCtrl
        .create({
          header: alertOpts.title,
          message: alertOpts.msg,
          buttons: this.defaultbuttons,
          animated: this.animated,
          keyboardClose: this.keyboardClose,
          cssClass: "",
          backdropDismiss: false,
          id: alertOpts.id,
        })
        .then(alertEl => alertEl.present());
    }
  }

}