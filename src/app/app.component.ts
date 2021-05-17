import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth/auth.service';
import { MainAppService } from '@app_main/shared';
import { Capacitor, Plugins } from '@capacitor/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  navList: nest.INavigationObject[];
  isAuthenticated: boolean = false;
  selectedIndex: boolean;
  languageOpts: string[];
  currentLang: string;
  langPopoverOptions: any;
  private prevAuthState = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authSvc: AuthService,
    private mainSvc: MainAppService
  ) {
    this.initializeApp();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen'))
        Plugins.SplashScreen.hide();

        console.log('Mobile:', this.platform.is('mobile'));
    console.log('Hybrid:', this.platform.is('hybrid'));
    console.log('iOS:', this.platform.is('ios'));
    console.log('Android:', this.platform.is('android'));
    console.log('Desktop:', this.platform.is('desktop'));
    });
  }


  ngOnInit() {

    this.initStarterData();
    //    this.initLanguageOpts();

  }
  initStarterData() {
    this.authSvc.authenticationChanged$
      .subscribe(isAuth => {
        if (isAuth) {
        this.isAuthenticated = true;
          this.navList = this.mainSvc.getNavigationList();
        } else {
          this.navList = [];
          this.isAuthenticated = false;
        }
      });
  }

  initLanguageOpts() {
    this.langPopoverOptions = {
      header: "Language"
    }
    this.languageOpts = [];
    this.currentLang = "";

  }
  onChangeLocalization(event: any) {
    console.log("selected culture: " + event.detail.value);
    // this.store.dispatch(new SetLanguage(event.detail.value)).subscribe(()=>{
    // window.location.reload();
    // });
  }

  onLogOut() {
    this.authSvc.logout();
  }
  ngOnDestroy() {
   
  }
}
