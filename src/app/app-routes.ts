import {  Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';



export const appRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthPageModule)
    },

    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardPageModule),
        canLoad: [AuthGuard]
    },
   
    {
        path: 'configurations',
        loadChildren: () => import('./configurations/configurations.module').then(m => m.ConfigurationsPageModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'customers',
        loadChildren: () => import('./customers/customers.module').then(m => m.CustomersPageModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'suppliers',
        loadChildren: () => import('./suppliers/suppliers.module').then(m => m.SuppliersPageModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'employees',
        loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesPageModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'production',
        loadChildren: () => import('./production/production.module').then(m => m.ProductionPageModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'inventory',
        loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryPageModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'expense',
        loadChildren: () => import('./expense/expense.module').then(m => m.ExpensePageModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'reports',
        loadChildren: () => import('./reports/reports.module').then(m => m.ReportsPageModule),
        canLoad: [AuthGuard]
    },

    {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsPageModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.OrderPageModule),
        canLoad: [AuthGuard]
    },
    {
        path: 'template-page',
        loadChildren: () => import('@nest/template-page/template-page.module').then(m => m.TemplatePageModule),
        canLoad: [AuthGuard]
    },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }

];