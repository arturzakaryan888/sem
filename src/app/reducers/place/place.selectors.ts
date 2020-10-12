import { createFeatureSelector, createSelector } from '@ngrx/store';
import {placeFeatureKey, PlaceState} from "./place.reducer";

export const selectPlaceFeature = createFeatureSelector<PlaceState>(placeFeatureKey)

export const getPlaces = createSelector(selectPlaceFeature,(state: PlaceState): Array<any> => state.places)
