import { Injectable } from '@angular/core';
import { StateToken, State, Selector, Action, StateContext } from '@ngxs/store';
import { ZooStateModel } from './model';
import { ZooDuty } from './actions';

export const ZOO_STATE_TOKEN = new StateToken<ZooStateModel>('zoo');

@State({
  name: ZOO_STATE_TOKEN,
  defaults: null// if you specify the wrong state type, will be a compilation error
})
@Injectable()
export class ZooState {

  @Selector()
  public static hasEaten(state:ZooStateModel):ZooStateModel|null {
    return state.hasEaten?state:null;
  }

  @Action(ZooDuty.FeedAnimals)
  public feedAnimals(ctx: StateContext<ZooStateModel>, action: ZooDuty.FeedAnimals) {
    const state = ctx.getState();
    ctx.patchState({
      name: action.payload.name,
      hasEaten:action.payload.hayAmount>0?true:false
    });
    
  }
  
  
  
}