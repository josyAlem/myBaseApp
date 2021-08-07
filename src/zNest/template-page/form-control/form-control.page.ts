import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  templateUrl: './form-control.page.html',
  styleUrls: ['./form-control.page.scss'],
})
export class FormControlPage implements OnInit {
  selectedCar: any;
  isLoading: boolean = false;
  selectedLocationImage: string = null;
  selectedImage: string = null;
  enteredNumber: string = null;
  ctxMenuList: nest.IContextMenu[];
  panelOpenState:boolean;
  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];
  constructor(
    private _location: Location,
  ) {

    this.ctxMenuList = [
      { label: "Add item", icon: "add", command: (event) => this.onNavigateBack() },
      { label: "Add item2", icon: "add", disabled: true, command: (event) => this.onNavigateBack() },
      { label: "Add item3", icon: "add", command: (event) => this.onNavigateBack() }
    ];

  }
  ngOnInit() {
  }
  onNavigateBack(): void {
    this._location.back();
  }
}
