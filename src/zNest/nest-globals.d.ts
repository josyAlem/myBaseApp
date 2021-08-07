
declare namespace nest {


interface INavigationObject {
        id: string,
        title: string,
        route: string,
        icon: string,
        order: number,
        isDefaultPath: boolean
    }

     interface IDataModelField {
        name: string,
        label: string,
        controlType: string,
        dataType: string,
        type: string,
        formView:boolean,
        disabled?:boolean,
        width?:string
    }
    interface IDataModelColumn {
        field: string,
        header: string,
        isViewDetailLink?:boolean,
        styleClass?:string
        
    }

    interface IDataTable{
        tableCaption?: string,
        rows: MatTableDataSource<any>,
        columns: nest.IDataModelColumn[],
        selectableRows: boolean,
        expandContent?:string,
        sortBy?:string,
        sortDirection?:string,
         contextMenu?: IContextmenu[],
         paginator: true,
        pageSizeOptions?: number[],
        pageSize?:number,
        totalRecords:number
    
    }
    interface IContextMenu {
        id?:string,
        label?: string;
        icon?: string;
        disabled?: boolean,
        command?: (ctxMenuId?: string,data?:any) => void
      }
    
    interface IDataModelValidator {
        name: string,
        validationRule?: any[]
    }
    interface IDataModel {
        fields: IDataModelField[],
        columns: IDataModelColumn[],
        validators?:IDataModelValidator[]
    }


}