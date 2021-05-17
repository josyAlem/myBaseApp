import { Component, OnInit, OnChanges } from '@angular/core';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { IPickedLocation, IImageData } from '@nest/core';
import { MapModalComponent } from '@app_main/zNest/core';
@Component({
  templateUrl: './picker.page.html',
  styleUrls: ['./picker.page.scss'],
})
export class PickerPage implements OnInit, OnChanges {

  isLoading: boolean = false;
  selectedLocationImage: string = null;
  selectedLocationImage2: string = null;
  selectedImage: string = null;
  selectedImage2: string = null;
  constructor(
    private modalCtrl: ModalController,
    private _location: Location,
  ) {

  }
  ngOnChanges() {
    this.selectedLocationImage = null;
    this.selectedLocationImage2 = null;
  }
  ngOnInit() {


  }
  onLocationPicked(locationData: IPickedLocation) {
    this.selectedLocationImage = locationData.staticMapImageUrl;
  }
  onLocationPicked2(locationData: IPickedLocation) {
    this.selectedLocationImage2 = locationData.staticMapImageUrl;
  }
  onShowMapModal() {
    this.modalCtrl.create({
      component: MapModalComponent, componentProps: {
        center: { lat: -34.397, lng: 150.644 },
        selectable: false,
        closeButtonText: 'Close',
        title: 'test image'
      }
    })
      .then(modalEl => {
        modalEl.present();
      });
  }
  onImagePicked(imageData: IImageData) {
    this.selectedImage = imageData.dataUrl;
  }
  onImagePicked2(imageData: IImageData) {
    this.selectedImage2 = imageData.dataUrl;
  }

  onNavigateBack(): void {
    this._location.back();
  }
}
