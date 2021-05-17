import { Component, OnChanges, Input, Output, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import * as _ from 'underscore';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
    selector: 'tmpl-grid',
    templateUrl: './tmpl-grid.html',
    styleUrls: ['tmpl-grid.css'],
    animations: [
        trigger('detailExpandTrigger', [
          state('collapsed', style({height: '0px', minHeight: '0'})),
          state('expanded', style({height: '*'})),
          transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
      ]
})
export class TmplDataGridComponent implements OnChanges, OnInit {
   
    @Input() inputDataSource: nest.IDataTable;
    @Output() onRowSelected: EventEmitter<any> = new EventEmitter();
    @Output() onRowUnselected: EventEmitter<any> = new EventEmitter();
    @Output() onFieldClicked: EventEmitter<any> = new EventEmitter();
    selectedRowData: SelectionModel<any>;
    showSearchRow: boolean = false;
    localDataTable:nest.IDataTable;
    expandedElement: PeriodicElement | null;
    isLoadingResults:boolean=false;
    tableColHeaders:string[];

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
    constructor() {

    }
    ngOnInit(): void {
      console.log("datatable component init.");
    }
    ngOnChanges() {
      this.initDataTable();
    };

    initDataTable(){
        this.selectedRowData = new SelectionModel<PeriodicElement>(true, []);
    
        if(this.inputDataSource)
        {
          this.inputDataSource.rows.sort = this.sort;
          this.inputDataSource.rows.paginator = this.paginator;
          let modifiedColHeaders:nest.IDataModelColumn[];
          modifiedColHeaders= _.map(this.inputDataSource.columns,function(c){return c;});
          if(this.inputDataSource.expandContent!=null)
          {
           if(!_.findWhere(modifiedColHeaders,{header:'expand',field:'expand'}))
            modifiedColHeaders.unshift({header:'expand',field:'expand'});
          }
      
          if(this.inputDataSource.selectableRows==true)
          {
           if(!_.findWhere(modifiedColHeaders,{header:'select',field:'select'}))
           modifiedColHeaders.unshift({header:'select',field:'select'});
          }
      
          if(this.inputDataSource.contextMenu!=null)
          {
           if(!_.findWhere(modifiedColHeaders,{header:'ctxMenu',field:'ctxMenu'}))
           modifiedColHeaders.push({header:'ctxMenu',field:'ctxMenu'});
          }
      
          this.tableColHeaders= _.pluck(modifiedColHeaders,"header"),
          this.localDataTable=this.inputDataSource;

          if(this.localDataTable.pageSizeOptions==null)
          this.localDataTable.pageSizeOptions= [5, 10, 20, 50, 100,500,1000,10000];
          if(this.localDataTable.totalRecords==null)
          this.localDataTable.totalRecords= this.localDataTable.rows.length;
          if(this.localDataTable.pageSize==null)
          this.localDataTable.pageSize= 5;
          if(this.localDataTable.sortBy==null)
          this.localDataTable.sortBy= this.localDataTable.columns[0].header;
          if(this.localDataTable.sortDirection==null)
          this.localDataTable.sortDirection="asc";
        }
        else
      { 
         const localDataSource=new MatTableDataSource<PeriodicElement>(ROW_DATA);
        localDataSource.sort = this.sort;
        localDataSource.paginator = this.paginator; 
        let modifiedColHeaders:nest.IDataModelColumn[];
        modifiedColHeaders= _.map(COLUMN_DATA2,function(c){return c;});
         if(!_.findWhere(modifiedColHeaders,{header:'expand',field:'expand'}))
          modifiedColHeaders.unshift({header:'expand',field:'expand'});
         if(!_.findWhere(modifiedColHeaders,{header:'select',field:'select'}))
         modifiedColHeaders.unshift({header:'select',field:'select'});
         if(!_.findWhere(modifiedColHeaders,{header:'ctxMenu',field:'ctxMenu'}))
         modifiedColHeaders.push({header:'ctxMenu',field:'ctxMenu'});
    
    this.tableColHeaders= _.pluck(modifiedColHeaders,"header");
    
    this.localDataTable={
        tableCaption: "Sample Data Table",
        rows:localDataSource,
        columns:COLUMN_DATA2,
        selectableRows: true,
        expandContent:`<div>        <h3>detail <br/>data</h3>      </div>`,
        sortBy:COLUMN_DATA2[0].header,
        sortDirection:"desc",
        contextMenu: [
            { label: "Add item", icon: "add", command: (mId:string,data:any) => null },
            { label: "Add item2", icon: "add", disabled: true, command: (mId:string,data:any) =>null },
            { label: "Add item3", icon: "add", command: (mId:string,data:any) => null }
          ] ,
          paginator: true,
          pageSizeOptions: [5, 10, 20, 50, 100],
          pageSize:10,
          totalRecords:ROW_DATA.length
    };

      }
       
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.localDataTable.rows.filter = filterValue.trim().toLowerCase();
      }

      
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selectedRowData.selected.length;
    const numRows = this.localDataTable.rows.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selectedRowData.clear() :
        this.localDataTable.rows.data.forEach(row => this.selectedRowData.select(row));
  }
onAllCheckboxChanged(event:any){
    if(event)
     this.masterToggle();
}


onRowCheckboxClicked(event:any){
    event.stopPropagation();
}
onChangeRowSelection(event:any,rowData:any){
    if(event){
       this.selectedRowData.toggle(rowData);
      if(this.selectedRowData.selected){
         this.onRowSelected.emit(rowData);
       console.log("selected row: " + JSON.stringify(rowData));
      }
     else
        {this.onRowUnselected.emit(rowData);
      console.log("unselected row: " + JSON.stringify(rowData));
     }
    }

}
onPageChanged(event:any){

}
    onViewDetail(field: string, rowData: any) {
        this.onFieldClicked.emit({ field: field, rowData: rowData });
        console.log("selected field: " + field + " rowData: " + JSON.stringify(rowData));
    }
 onViewExpandedContent(rowData:any){
    this.expandedElement =this.expandedElement === rowData ? null : rowData;
 }
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ROW_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
const COLUMN_DATA2:nest.IDataModelColumn[]=[
  {header:'name',field:'name'},
{header:'position',field:'position'},
{header:'symbol',field:'symbol'},
{header:'weight',field:'weight'}];

