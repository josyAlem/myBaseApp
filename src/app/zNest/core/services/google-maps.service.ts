import { Injectable } from '@angular/core';
import { environment } from '@envt/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ICoordinates } from '@nest/core';

@Injectable()
export class GoogleMapsService {

  constructor(    private http: HttpClient

  ) { }

  getMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =        `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsAPIKey}` ;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not available.');
        }
      };
    });
  }

   getAddress(coords: ICoordinates) {
    return this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=
        ${coords.lat},${coords.lng}&key=${environment.googleMapsAPIKey}`
      ).pipe(
        map(geoData => {
          if (!geoData || !geoData.results || geoData.results.length === 0) {
            return null;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }

/**
 * @defaultValues
 *
 * zoom = 14
 * width = 500, 
 * height = 300,
 * markerColor = 'red',
 * markerLabel = 'Place',
 * mapType = 'roadmap'
 * 
 */
   getMapImage(coords: ICoordinates, zoom: number=14,width:number=500,height:number=300,
    markerColor:string='red',markerLabel:string='Place',mapType:string='roadmap') {

    return `https://maps.googleapis.com/maps/api/staticmap?center=
    ${coords.lat},${coords.lng}
    &zoom=${zoom}
    &size=${width}x${height}
    &maptype=${mapType}
    &markers=color:${markerColor}%7Clabel:${markerLabel}%7C${coords.lat},${coords.lng}
    &key=${environment.googleMapsAPIKey}`;
  
  }
}
