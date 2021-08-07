import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {
  navList: nest.INavigationObject[];

  constructor() { 
    this.fillNavList();
    
  }

  getNavigationList() {
    return this.navList
  }

  private fillNavList() {
    this.navList = [
      {
        id: "dashboard",
        title: "Dashboard",
        route: "/dashboard",
        icon: "speedometer",
        order: 1,
        isDefaultPath: true
      },
      {
        id: "order",
        title: "Orders",
        route: "/order",
        icon: "list",
        order: 2,
        isDefaultPath: false
      },
      {
        id: "production",
        title: "Production",
        route: "/production",
        icon: "list",
        order: 2,
        isDefaultPath: false
      },
      {
        id: "inventory",
        title: "Inventory",
        route: "/inventory",
        icon: "list",
        order: 2,
        isDefaultPath: false
      },
      {
        id: "expense",
        title: "Expense",
        route: "/expense",
        icon: "list",
        order: 2,
        isDefaultPath: false
      },
      {
        id: "employees",
        title: "Employees",
        route: "/employees",
        icon: "list",
        order: 2,
        isDefaultPath: false
      },
      {
        id: "customers",
        title: "Customers",
        route: "/customers",
        icon: "list",
        order: 2,
        isDefaultPath: false
      },
      {
        id: "suppliers",
        title: "Suppliers",
        route: "/suppliers",
        icon: "list",
        order: 2,
        isDefaultPath: false
      },
      {
        id: "configurations",
        title: "Configurations",
        route: "/configurations",
        icon: "list",
        order: 2,
        isDefaultPath: false
      },
      {
        id: "settings",
        title: "Settings",
        route: "/settings",
        icon: "cog",
        order: 8,
        isDefaultPath: false
      },
      {
        id: "reports",
        title: "Reports",
        route: "/reports",
        icon: "document",
        order: 8,
        isDefaultPath: false
      },
      {
        id: "template-page",
        title: "Template Page",
        route: "/template-page",
        icon: "information",
        order: 8,
        isDefaultPath: false
      }];
  }
}
