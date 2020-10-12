import { createAction, props } from '@ngrx/store';
import {Action} from "rxjs/internal/scheduler/Action";

export const loadPlaces = createAction(
  '[Place] Load Places',
  (places: any) => ({places})
);

export const addPlace = createAction(
  '[Place] Add Places',
  (place: any) => ({place})
);

export const deletePlace = createAction(
  '[Place] Delete Places',
  (id: number) => ({id})
);
export const editPlace = createAction(
  '[Place] Edit Places',
  (place: any) => ({place})
);
