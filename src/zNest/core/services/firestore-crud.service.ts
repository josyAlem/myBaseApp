import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class FirestoreCrudService {

  constructor(
    private firestore: AngularFirestore
  ) { }


  create(collectionName:string,record:any) {
    return this.firestore.collection(collectionName).add(record);
  }
  get(collectionName:string,recordId:string) {
    return this.firestore.doc(collectionName+'/' + recordId).get();
  }

  read(collectionName:string) {
    return this.firestore.collection(collectionName).snapshotChanges();
  }

  update(collectionName:string,recordId:string,record:any){
    return this.firestore.doc(collectionName +'/' + recordId).update(record);
  }

  delete(collectionName:string,recordId:string) {
    return this.firestore.doc(collectionName+'/' + recordId).delete();
  }
}