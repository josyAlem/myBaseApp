import { Validators } from '@angular/forms';
import * as nestStatics from '@nest/nest-statics';

export var SampleModel: nest.IDataModel = {
    fields: [
        { name: 'id', label: "Id", formView: false, controlType:nestStatics.FormCtrlType.INPUT, dataType: 'string', type:'text' },
        { name: 'name', label: "Name", formView: true, controlType: nestStatics.FormCtrlType.INPUT, dataType: 'string' , type:'text'},
        { name: 'surname', label: "Surname", formView: true, controlType: nestStatics.FormCtrlType.INPUT, dataType: 'string' , type:'text'},
        { name: 'userName', label: "User Name", formView: true, controlType: nestStatics.FormCtrlType.INPUT, dataType: 'string' , type:'text'},
        { name: 'emailAddress', label: "Email Address", formView: true, controlType: nestStatics.FormCtrlType.INPUT, dataType: 'string' , type:'email'},
        { name: 'password', label: "Password", formView: true, controlType: nestStatics.FormCtrlType.INPUT, dataType: 'string' , type:'password'},
        { name: 'description', label: "Description", formView: true, controlType: nestStatics.FormCtrlType.TEXTAREA, dataType: 'string', type:'textarea' },
        { name: 'isActive', label: "Is Active", formView: true, controlType: nestStatics.FormCtrlType.CHECKBOX, dataType: 'bool', type:'checkbox' }
    ],
    columns: [
        { field: 'name', header: 'Name',isViewDetailLink:true },
        { field: 'surname', header: 'Surname',styleClass:'content-non-mobile' },
        { field: 'userName', header: 'User Name' },
        { field: 'emailAddress', header: 'Email Address',styleClass:'content-non-mobile' },
        { field: 'isActive', header: 'Is Active' ,styleClass:'content-non-mobile'}
    ],
    validators:[
        {name:"name",validationRule:[Validators.required,Validators.pattern(nestStatics.RegExValidators.ALPHA_NUM_SPACE),Validators.minLength(3)]},
        {name:"surname",validationRule:[Validators.required,Validators.pattern(nestStatics.RegExValidators.ALPHA_NUM_SPACE),Validators.minLength(3)]},
        {name:"userName",validationRule:[Validators.required,Validators.pattern(nestStatics.RegExValidators.ALPHA_NUM),Validators.minLength(3)]},
        {name:"password",validationRule:[Validators.required,Validators.pattern(nestStatics.RegExValidators.ALPHA_NUM),Validators.minLength(6)]},
        {name:"emailAddress",validationRule:[Validators.required,Validators.email]},
    ]
};

