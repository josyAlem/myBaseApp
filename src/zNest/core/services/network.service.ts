import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Network, ConnectionStatus } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';
import { PluginListenerHandle } from '@capacitor/core';

@Injectable()
export class NetworkService implements OnInit, OnDestroy {
  networkHandler: PluginListenerHandle = null;
  networkStatus$: BehaviorSubject<ConnectionStatus> = null;
  internetStatus$: BehaviorSubject<boolean> = null;

  constructor(
    private _http: HttpClient

  ) {
  this.internetStatus$=new  BehaviorSubject<boolean>(true);
  this.networkStatus$=new  BehaviorSubject<ConnectionStatus>({connected:false,connectionType:"unknown"});
  this.offlineChecker();

  }
  ngOnInit() {
    this.initNetworkTracker();
  }
  ngOnDestroy() {
    this.destroyNetworkTracker();
  }
  destroyNetworkTracker() {
    if (this.networkHandler)
      this.networkHandler.remove();
  }
  initNetworkTracker() {
    if (this.networkHandler)
      this.networkHandler.remove();

    this.networkHandler = Network.addListener('networkStatusChange', (status) => {
      this.networkStatus$.next(status);
      console.log("Network status changed", status);
    });
  }

  checkNetwork() {
    return Network.getStatus();
  }

  get isOffline() {
    return this.internetStatus$.asObservable();
  }
  offlineChecker() {
    this._http.get('https://www.google.com').subscribe(result => {
      this.internetStatus$.next(false);

    },
      err => {
      this.internetStatus$.next(true);
        console.log(JSON.stringify(err));
      });

  }
}
