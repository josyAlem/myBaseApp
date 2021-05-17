import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';
import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType
} from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { AlertService } from '@nest/core/services';
import { IImageData } from '@nest/core/interfaces';
import * as _ from 'underscore';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.presenter.html',
  styleUrls: ['./image-picker.presenter.scss']
})
export class ImagePickerPresenter implements OnInit {
  @ViewChild('filePicker', { static: false }) filePickerRef: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<IImageData>();
  @Input() showPreview: boolean = true;
  @Input() previewWidth: number = 100;
  @Input() previewHeight: number = 100;
  selectedImage: string;
  usePicker = false;
  isLoading = false;

  constructor(private platform: Platform,
    private alertSvc: AlertService
  ) { }

  ngOnInit() {

    if (
      (this.platform.is('mobile') && !this.platform.is('hybrid')) ||
      this.platform.is('desktop')
    ) {
      this.usePicker = true;
    }
  }
  onBrowseImage() {
    this.filePickerRef.nativeElement.click();
  }
  onTakePicture() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      this.onBrowseImage();
      return;
    }
    this.isLoading = true;
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Camera,
      correctOrientation: true,
      height: 280,
      width: 300,
      resultType: CameraResultType.Uri
    })
      .then(image => {
        this.selectedImage = image.webPath;
        const imageData: IImageData = {
          byteData: image.base64String,
          dataUrl: image.webPath,
          format: image.format
        };
        this.imagePick.emit(imageData);
        this.isLoading = false;
      })
      .catch(error => {
        this.alertSvc.showError({ msg: JSON.stringify(error), title: "Error capturing image!" });
        console.log(error);
        if (this.usePicker) {
          this.onBrowseImage();
        }
        this.isLoading = false;
        return false;
      });
  }

  onFileChosen(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    if (!pickedFile) {
      return;
    }
    this.isLoading = true;
    let allowedTypes: string[] = ["jpeg", "png", "gif", "jpg"];
    const fr = new FileReader();
    fr.onload = () => {
      let hasAllowedTypes: string[] = _.filter(allowedTypes, function (typ) {
        if (pickedFile.type.match('image/' + typ))
          return true;
      });
      if (hasAllowedTypes.length == 0) {
        this.alertSvc.showError({ msg: "Image types allowed are:" + allowedTypes.toString(), title: "Not Allowed!" });
        this.isLoading = false;
      } else {
      this.selectedImage = fr.result.toString();
        let fileType: string = pickedFile.type.replace('image/', '');
        let binaryData: string = fr.result.toString().replace('data:' + pickedFile.type + ';base64,', '');
        const imageData: IImageData = { byteData: binaryData, dataUrl: fr.result.toString(), format: fileType }
        this.imagePick.emit(imageData);
      }
      this.isLoading = false;

    };
    fr.readAsDataURL(pickedFile);
  }


}
