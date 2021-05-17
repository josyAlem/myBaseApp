import { Component, OnInit } from '@angular/core';

import { FirestoreCrudService } from '@nest/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage  implements OnInit {
  title = 'Firestore CRUD Operations Students App';

  students: any;
  studentName: string;
  studentAge: number;
  studentAddress: string;

  constructor(private crudService: FirestoreCrudService) { }
  ngOnInit() {}
  // ngOnInit() {
  //   this.crudService.read('Student').subscribe(data => {

  //     this.students = data.map(e => {
  //       return {
  //         id: e.payload.doc.id,
  //         isEdit: false,
  //         Name: e.payload.doc.data()['Name'],
  //         Age: e.payload.doc.data()['Age'],
  //         Address: e.payload.doc.data()['Address'],
  //       };
  //     })
  //     console.log(this.students);

  //   });
  // }

  // CreateRecord() {
  //   let record = {};
  //   record['Name'] = this.studentName;
  //   record['Age'] = this.studentAge;
  //   record['Address'] = this.studentAddress;
  //   this.crudService.create('Student',record).then(resp => {
  //     this.studentName = "";
  //     this.studentAge = undefined;
  //     this.studentAddress = "";
  //     console.log(resp);
  //   })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  // RemoveRecord(rowID) {
  //   this.crudService.delete('Student',rowID);
  // }

  // EditRecord(record) {
  //   record.isEdit = true;
  //   record.EditName = record.Name;
  //   record.EditAge = record.Age;
  //   record.EditAddress = record.Address;
  // }

  // UpdateRecord(recordRow) {
  //   let record = {};
  //   record['Name'] = recordRow.EditName;
  //   record['Age'] = recordRow.EditAge;
  //   record['Address'] = recordRow.EditAddress;
  //   this.crudService.update('Student',recordRow.id, record);
  //   recordRow.isEdit = false;
  // }

}