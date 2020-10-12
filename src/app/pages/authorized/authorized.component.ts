import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {PlaceState} from "../../reducers/place/place.reducer";
import {Observable} from "rxjs";
import {getPlaces} from "../../reducers/place/place.selectors";
import {loadPlaces} from "../../reducers/place/place.actions";
import {PlaceService} from "../../services/places/places.service";

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.scss']
})
export class AuthorizedComponent implements OnInit {

  constructor() { }
  ngOnInit() {

  }
}
