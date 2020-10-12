import {Action, createReducer, on} from '@ngrx/store';
import {addPlace, deletePlace, editPlace, loadPlaces} from "./place.actions";


export const placeFeatureKey = 'place';

export interface PlaceState {
  places: Array<any>
}

export const initialState: PlaceState = {
  places: []
};

const reducer = createReducer(
  initialState,
  //@ts-ignore
  on(
    loadPlaces,
    (state, {places}) => ({...state, places: places})
  ),
  on(
    deletePlace,
    //@ts-ignore
    (state, {place_id}) => {
      let index = state.places.findIndex(element => element.id === place_id)
      state.places.splice(index, 1);
    }
  ),
  on(
    editPlace,
    //@ts-ignore
    (state, {place}) => {
      state.places.splice(state.places.findIndex(element => element.id === place.id), 1, place);
    }
  ),
  //@ts-ignore
  on(
    addPlace,
    //@ts-ignore
    (state, {place}) => (
      state.places.unshift(place)
    )
  ),
);

export function placeReducer(state: PlaceState | undefined, action: Action) {
  return reducer(state, action);
}

