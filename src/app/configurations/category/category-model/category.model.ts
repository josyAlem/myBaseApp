import { Validators } from '@angular/forms';
import * as nestStatics from '@nest/nest-statics';

export var CategoryModel: nest.IDataModel = {
    fields: [
        { name: 'id', label: "Id", formView: false, controlType:nestStatics.FormCtrlType.INPUT, dataType: 'string', type:'text' },
        { name: 'name', label: "Name", formView: true, controlType: nestStatics.FormCtrlType.INPUT, dataType: 'string' , type:'text'},
        { name: 'description', label: "Description", formView: true, controlType: nestStatics.FormCtrlType.TEXTAREA, dataType: 'string', type:'textarea' },
        { name: 'isActive', label: "Is Active", formView: true, controlType: nestStatics.FormCtrlType.CHECKBOX, dataType: 'bool', type:'checkbox' }
    ],
    columns: [
        { field: 'name', header: 'Name' },
        { field: 'isActive', header: 'Is Active' ,styleClass:'content-non-mobile'}
    ],
    validators:[
        {name:"name",validationRule:[Validators.required,Validators.pattern(nestStatics.RegExValidators.ALPHA_SPACE),Validators.minLength(3)]},
        {name:"description"},
    ]
};

