// import { EmailComposer } from '@ionic-native/email-composer/ngx';
// import { Injectable } from '@angular/core';
// @Injectable()
// export class EmailService {

// constructor(private emailComposer: EmailComposer) { 
//     this.initComposer();
// }

// initComposer()
// {
//     this.emailComposer.isAvailable().then((available: boolean) =>{
//  if(available) {
//    //Now we know we can send
//  }
// });
// }
// composeEmail(){
// let email = {
//   to: 'max@mustermann.de',
//   cc: 'erika@mustermann.de',
//   bcc: ['john@doe.com', 'jane@doe.com'],
//   attachments: [
//     'file://img/logo.png',
//     'res://icon.png',
//     'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
//     'file://README.pdf'
//   ],
//   subject: 'Cordova Icons',
//   body: 'How are you? Nice greetings from Leipzig',
//   isHtml: true
// }

// // Send a text message using default options
// this.emailComposer.open(email);

// // // add alias
// // this.email.addAlias('gmail', 'com.google.android.gm');

// // // then use alias when sending email
// // this.email.open({
// //   app: 'gmail',
// //   ...
// // });
// }

// }