import { alertStyle } from '@nest/nest-enums';

export interface IAlertOptions { 
    msg?: string,
    title?: string,
    position?: "top" | "bottom" | "middle",
    color?: string, 
    bypassAlertStyle?: alertStyle,
id?:string }