import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'common-header-view',
    templateUrl: './common-header-view.html',
})
export class CommonHeaderViewComponent implements OnInit {
    @Output() onClickButtonAction = new EventEmitter();
    @Input() menuActions: nest.IContextMenu[];
    @Input() buttonActions: nest.IContextMenu[];
    ctx_btn: any;
   private all_actions:nest.IContextMenu[];
    constructor(
        public _router: Router,
        public _location :Location)
         {

    }
    ngOnInit() {
        this.all_actions=_.union(this.buttonActions, this.menuActions);
    }
   

    onNavigateBack() {
        this._location.back();
    }

    

}