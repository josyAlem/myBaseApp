import { LocalNotifications } from '@capacitor/local-notifications';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalNotificationService {

  schedule(){
  return LocalNotifications.schedule({
  notifications: [
    {
      title: "Title",
      body: "Body",
      id: 1,
      schedule: { at: new Date(Date.now() + 1000 * 5) },
      sound: null,
      attachments: null,
      actionTypeId: "",
      extra: null
    }
  ]
}).then(notifs=>{
    console.log('scheduled notifications', notifs);
});

}
}