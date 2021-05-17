import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
//import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from '@envt/environment';

//const LOGGERS = [NgxsLoggerPluginModule.forRoot({ disabled: true })];

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

import { AppComponent } from './app.component';
import { ZooState, MainAppService } from '@app_main/shared';
import { NestSharedModule } from '@nest/nest-shared.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { TranslateModule } from '@ngx-translate/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { appRoutes } from './app-routes';

@NgModule({
  imports: [
    NgxsModule.forRoot([ZooState], {
      selectorOptions: {
        suppressErrors: false // `true` by default
      }
    }),
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
    NestSharedModule,
    // ...(environment.production ? [] : LOGGERS),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    TranslateModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [AppComponent],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    MainAppService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
