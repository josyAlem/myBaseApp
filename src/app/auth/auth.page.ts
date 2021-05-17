import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  loginEmail: string;
  loginPsw: string;

   constructor(private authSvc: AuthService,
     private alertCtrl: AlertController) { }


  ngOnInit() {
    this.loginEmail = 'test@test.com';
    this.loginPsw = '123456';

    this.authSvc.autoLogin().subscribe(isAuth => {
      if (isAuth)
        this.authSvc.goToHomePage();
    });
  }

  onLogin() {
    // if (this.authSvc.offlineMode===true)
    //   return this.authSvc.offlineLogin(this.loginEmail, this.loginPsw);

    this.authSvc.login(this.loginEmail, this.loginPsw)
      .subscribe(c => {
        this.authSvc.goToHomePage();

      }, err => {
        this.alertCtrl.create({ header: "Login response", message: JSON.stringify(err), buttons: ['Ok'] }).then(c => c.present());
      });
  }
  onSignUp() {
    if (this.authSvc.offlineMode===true)
      return this.authSvc.offlineLogin(this.loginEmail, this.loginPsw);

    this.authSvc.signUp(this.loginEmail, this.loginPsw)
      .subscribe(c => {
        this.authSvc.goToHomePage();

      }, err => {
        this.alertCtrl.create({ header: "Signup response", message: JSON.stringify(err), buttons: ['Ok'] }).then(c => c.present());
      });
  }

}
