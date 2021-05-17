import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@envt/environment';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap, take } from 'rxjs/operators';
import { User } from '@app_main/shared';
import { Plugins } from '@capacitor/core';
import { Router } from '@angular/router';
import { IFirebaseAuthResponse, NetworkService } from '@nest/core';
import { MainAppService } from '@app_main/shared';



@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy, OnInit {
  authenticationChanged$:BehaviorSubject<User>;
  private autoLogoutTimeOut: any;
  offlineMode:boolean=null;
  constructor(private _http: HttpClient, private router: Router,private netwSvc:NetworkService) {
    this.authenticationChanged$=new BehaviorSubject<User>(null);
    this.netwSvc.internetStatus$.subscribe(result=>{
      this.offlineMode=result;
    }); }
  ngOnInit() {
    
  }

  ngOnDestroy(): void {
    if (this.autoLogoutTimeOut) {
      clearTimeout(this.autoLogoutTimeOut);
    }
  }
 

  autoLogin() {
    return from(Plugins.Storage.get({ key: 'AuthData' }))
      .pipe(
        map(storedData => {
          if (!storedData || !storedData.value) {
            return false;
          }
          const parsedData = JSON.parse(storedData.value) as { id, email, token, tokenExpiry };
          const user = new User(parsedData.id, parsedData.email, parsedData.token, new Date(parsedData.tokenExpiry));
          if (user.tokenDuration <= 0) {
            return false;
          }
          else {
            this.authenticationChanged$.next(user);
            this.autoLogout(user.tokenDuration);
          }
          return true;
        }));
  }

  get userIsAuthenticated() {
    return this.authenticationChanged$.asObservable().pipe(map(u => {
      if (u)
        return !!u.token;
      else
        return false;
    }));
  }

  get userId() {
    return this.authenticationChanged$.asObservable().pipe(map(u => {
      if (u)
        return u.id;
      else
        return null;
    }));

  }
  goToLoginPage() {
    this.router.navigateByUrl('/auth');
  }
  goToHomePage() {
    this.router.navigateByUrl('/dashboard');
  }
  login(email: string, psw: string) {
    return this._http.post<IFirebaseAuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`,
      { email: email, password: psw, returnSecureToken: true })
      .pipe(tap(uData => { this.setUserData(uData); }));

  }

  signUp(email: string, psw: string) {
    return this._http.post<IFirebaseAuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`,
      { email: email, password: psw, returnSecureToken: true })
      .pipe(tap(uData => { this.setUserData(uData); }));

  }
   setUserData(uData: IFirebaseAuthResponse) {
    const expTime = new Date(new Date().getTime() + (+uData.expiresIn * 1000));
    const user = new User(uData.localId, uData.email, uData.idToken, expTime);
    this.authenticationChanged$.next(user);
   
    const data = JSON.stringify({ id: user.id, email: user.email, token: user.token, tokenExpiry: expTime.toISOString() });
    Plugins.Storage.set({ key: 'AuthData', value: data });

    this.autoLogout(user.tokenDuration);
  }
  
  logout() {
    if (this.autoLogoutTimeOut) {
      clearTimeout(this.autoLogoutTimeOut);
    }
    this.authenticationChanged$.next(null);
    Plugins.Storage.remove({ key: 'AuthData' });
this.goToLoginPage();
}
  autoLogout(duration: number) {
    if (this.autoLogoutTimeOut) {
      clearTimeout(this.autoLogoutTimeOut);
    }
    this.autoLogoutTimeOut = setTimeout(() => {
      this.logout();

    }, duration);
  }

  offlineLogin(email: string, psw: string){
    this.autoLogin().subscribe(isAuth=>{
      if(isAuth)
      this.goToHomePage();
      else{
        const dt:IFirebaseAuthResponse={localId:'123',email: email,idToken: Math.random.toString(),expiresIn: new Date(2020,7,1).valueOf().toString(),refreshToken:'true'};
        this.setUserData(dt);
      this.goToHomePage();
      }
          });
     }

  

}
