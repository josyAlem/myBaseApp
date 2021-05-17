import { Injectable, OnInit } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { map, tap, find, take } from "rxjs/operators";
import * as nestStatics from '@nest/nest-statics';
import { SampleDto } from './sample-model/sample.dto';
import { FirestoreCrudService } from '@nest/core';



@Injectable()
export class CrudOpsService implements OnInit {

  public sampleList$: BehaviorSubject<SampleDto[]>;
  public sampleList: SampleDto[];
  collectionName:string;
  constructor(private crudSvc: FirestoreCrudService) {
    this.sampleList$ = new BehaviorSubject<SampleDto[]>([]);
    this.sampleList = [];
this.collectionName='TestStudent';
}
  ngOnInit() {

  }
  getById(id: string): Observable<SampleDto> {
    return this.crudSvc.get(this.collectionName,id)
    .pipe(take(1),map(res=>{
        let resData= this.convertToDTO(res.data(),res.id);
return resData;
    }));
  }


readPaged() {
     this.crudSvc.read(this.collectionName)
    .subscribe(res=>{
        this.sampleList=res.map(r=>{return this.convertToDTO(r.payload.doc.data(),r.payload.doc.id);});
        this.sampleList$.next(Object.assign([], this.sampleList));
        nestStatics.PageOptions.totalCount = this.sampleList.length;
    });
  }

  createNew(formData: any) {
    var request = this.convertToDTO(formData);
    return this.crudSvc.create(this.collectionName,request);
    
  }

  updateExisting(formData: any,id:string) {
    var request = this.convertToDTO(formData);
    return this.crudSvc.update(this.collectionName,id,request);
  }


  deleteExisting(id: string) {
    return this.crudSvc.delete(this.collectionName,id);
     
  }

  private convertToDTO(jsonData:any,id?:string):SampleDto{
    let result:SampleDto={
         id:id, 
         name: jsonData['Name'],
         userName:jsonData['UserName'],
         surname:jsonData['SurName'],
         emailAddress:jsonData['EmailAddress'],
         password:jsonData['Password'],
         description:jsonData['Description'],
         isActive:jsonData['IsActive']
     };
     return result;
        
 }

}