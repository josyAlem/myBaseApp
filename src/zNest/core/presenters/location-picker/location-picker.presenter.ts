

import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Plugins, Capacitor } from '@capacitor/core';

import { MapModalComponent } from './map-modal/map-modal.component';
import { GoogleMapsService, AlertService} from '@nest/core/services';
import {IPickedLocation,ICoordinates } from '@nest/core/interfaces'
import {MainAppService} from '@app_main/shared'

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.presenter.html',
  styleUrls: ['./location-picker.presenter.scss']
})
export class LocationPickerPresenter implements OnInit {
  @Output() locationPick = new EventEmitter<IPickedLocation>();
  @Input() showPreview:boolean = true;
  @Input() previewWidth:number = 100;
  @Input() previewHeight:number =100;
  selectedImage: string;
  isLoading = false;
  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertService,
    private googleMapsSvc:GoogleMapsService
  ) { }

  ngOnInit() {
    
   }

 

  onAutoLocate() {
    if (!Capacitor.isPluginAvailable('Geolocation')) {
      this.alertCtrl.showSuccess({msg:'Device does not support location',title:'Could not fetch location'});
      return;
    }
    this.isLoading = true;
    let coordinates: ICoordinates=null;
     Plugins.Geolocation.getCurrentPosition()
      .then(geoPosition => {
         coordinates = {
          lat: geoPosition.coords.latitude,
          lng: geoPosition.coords.longitude
        };
        this.getPickedLocation(coordinates);
        this.isLoading = false;
      })
      .catch(err => {
        this.isLoading = false;
    this.alertCtrl.showSuccess({msg:JSON.stringify(err)+ JSON.stringify(coordinates),title:'Could not fetch location'});
        
      });
  }



  onPickLocation() {
    this.modalCtrl.create({ component: MapModalComponent }).then(modalEl => {
      modalEl.onDidDismiss().then(modalData => {
        if (!modalData.data) {
          return;
        }
        const coordinates: ICoordinates = {
          lat: modalData.data.lat,
          lng: modalData.data.lng
        };
        this.getPickedLocation(coordinates);
      });
      modalEl.present();
    });
  }

  private getPickedLocation(coords: ICoordinates, withImage: boolean = false) {
    const pickedLocation: IPickedLocation = {
      lat: coords.lat,
      lng: coords.lng,
      address: null,
      staticMapImageUrl: null
    };
    this.isLoading = true;
    this.googleMapsSvc.getAddress(coords)
      .pipe(switchMap(address => {
        pickedLocation.address = address;
        if (withImage)
          return of(this.googleMapsSvc.getMapImage(coords));
        else {
          return of(null);
        }
      })
      ).subscribe(staticMapImageUrl => {
        pickedLocation.staticMapImageUrl = staticMapImageUrl;
        this.selectedImage = staticMapImageUrl;
        this.isLoading = false;
        this.locationPick.emit(pickedLocation);
      });
  }

  
}
