import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect} from '@ngrx/effects';
import {Store} from "@ngrx/store";
import {PlaceState} from "./place.reducer";
import {PlaceService} from "../../services/places/places.service";



@Injectable()
export class PlaceEffects {

  constructor(private store: Store<PlaceState>,
              private actions$: Actions,
              private places: PlaceService) {

  }

}
