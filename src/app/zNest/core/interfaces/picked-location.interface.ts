import {ICoordinates} from './coordinates.interface'

  export  interface IPickedLocation extends ICoordinates{
    address:string,
    staticMapImageUrl:string
    }