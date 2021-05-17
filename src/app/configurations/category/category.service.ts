import { Injectable, OnInit } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { map, tap, find, take } from "rxjs/operators";
import * as nestStatics from '@nest/nest-statics';
import { CategoryDto } from './category-model/category.dto';
import { FirestoreCrudService } from '@nest/core';



@Injectable()
export class CategoryService implements OnInit {

  public categoryList$: BehaviorSubject<CategoryDto[]>;
  public categoryList: CategoryDto[];
  collectionName: string;
  constructor(private crudSvc: FirestoreCrudService) {
    this.categoryList$ = new BehaviorSubject<CategoryDto[]>([]);
    this.categoryList = [];
    this.collectionName = 'Category';
  }
  ngOnInit() {

  }
  getById(id: string): Observable<CategoryDto> {
    return this.crudSvc.get(this.collectionName, id)
      .pipe(take(1), map(res => {
        let resData = this.convertToDTO(res.data(), res.id);
        return resData;
      }));
  }


  readPaged() {
    this.crudSvc.read(this.collectionName)
      .subscribe(res => {
        this.categoryList = res.map(r => { return this.convertToDTO(r.payload.doc.data(), r.payload.doc.id); });
        this.categoryList$.next(Object.assign([], this.categoryList));
        nestStatics.PageOptions.totalCount = this.categoryList.length;
      });
  }

  createNew(formData: any) {
    var request = this.convertToDTO(formData);
    return this.crudSvc.create(this.collectionName, request);

  }

  updateExisting(formData: any, id: string) {
    var request = this.convertToDTO(formData);
    return this.crudSvc.update(this.collectionName, id, request);
  }


  deleteExisting(id: string) {
    return this.crudSvc.delete(this.collectionName, id);

  }

  private convertToDTO(jsonData: any, id?: string): CategoryDto {
    let result: CategoryDto = {
      id: id,
      name: jsonData['Name'],
      description: jsonData['Description'],
      isActive: jsonData['IsActive']
    };
    return result;

  }

}