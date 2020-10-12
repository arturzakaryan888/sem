import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {placeFeatureKey, placeReducer, PlaceState} from "./place/place.reducer";


export interface State {
  [placeFeatureKey]: PlaceState
}

export const reducers: ActionReducerMap<State> = {
  [placeFeatureKey]: placeReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
