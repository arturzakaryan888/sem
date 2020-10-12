import {Component, OnInit} from '@angular/core';
import {TableItemComponent} from "./table-item/table-item.component";
import {TableRowComponent} from "./table-row/table-row.component"
import {ButtonWithIconComponent} from "../button-with-icon/button-with-icon.component";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Action} from "rxjs/internal/scheduler/Action";
import {getPlaces} from "../../reducers/place/place.selectors";
import {PlaceState} from "../../reducers/place/place.reducer";
import {PlaceService} from "../../services/places/places.service";
import {addPlace, deletePlace, editPlace, loadPlaces} from "../../reducers/place/place.actions";
import {Place} from "../../models/place";
import {EditableFieldComponent} from "../editable-field/editable-field.component";
import {SelectBoxComponent} from "../select-box/select-box.component";
import {SelectOptionComponent} from "../select-box/select-option/select-option.component";
import { ToastrService } from 'ngx-toastr';
import {PaginationComponent} from "../pagination/pagination.component";
import {PaginationItemComponent} from "../pagination/pagination-item/pagination-item.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  public handleCRSSelectChange: Function;
  public handleBackgroundModeChange: Function;
  public places$: Observable<Array<any>> = this.store$.pipe(select(getPlaces))
  public places: Place[];
  public new_place: Place = {};
  public static_options: Array<string> = ['8 румбов', '4 румбов', 'const'];
  public coordinates: any = [];
  public wantAddPlace: boolean = false;
  public wantEditPlace: boolean | number = false;
  public wantSearchPlace: boolean = false;
  public showSelectBox: boolean | number | string = false;
  public search_value: string = '';
  public select_type: string = '';
  constructor(private store$: Store<PlaceState>, private placeService: PlaceService,public toastr: ToastrService) {
  }

  ngOnInit() {
    this.placeService.getAllPlaces().subscribe((places: any) => {
      this.places = places.map((item, i) => Object.assign({}, item, places[i]));
      this.store$.dispatch(loadPlaces(places))
      this.places = places.map((item, i) => Object.assign({}, item, places[i]));
      this.store$.dispatch(loadPlaces(places))
    });
    this.handleCRSSelectChange = this.handleCRSSelectChangeCallback.bind(this);
    this.handleBackgroundModeChange = this.handleBackgroundModeChangeCallback.bind(this);
  }

  handleDeletePlace = (place_id: number) => {
    this.placeService.deletePlace(place_id).subscribe(() => {
      let index = this.places.findIndex(element => element.id === place_id)
      this.places.splice(index, 1);
      this.store$.dispatch(deletePlace(place_id))
    });
  }

  toggleEditPlace = (editable_place: Place | boolean) => {
    //@ts-ignore
    if (this.wantEditPlace) {
      this.wantEditPlace = false;
      this.showSelectBox = false;
    } else {

      this.wantEditPlace = false;
      //@ts-ignore
      this.wantEditPlace = editable_place.id
      //@ts-ignore
      this.placeService.getCoordinates(editable_place.id).subscribe((options) => {
          this.coordinates = options;
      });
    }
  }

  toggleAddPlace = () => {
    //@ts-ignore
    this.wantAddPlace ? this.wantAddPlace = false : this.wantAddPlace = true
    this.wantSearchPlace = false
  }

  toggleSearchPlace = () => {
    this.wantSearchPlace = !this.wantSearchPlace;
    this.wantAddPlace = false;
  }

  toggleSelectBox = (place_id,type) => {
    if(this.wantEditPlace === place_id){
      this.showSelectBox ? this.showSelectBox = false : this.showSelectBox = place_id;
      if(this.showSelectBox){
        this.select_type = type;
      }else{
        this.select_type = ''
      }
    }
  }

  handleEditPlace = (updated_place: Place) => {
    this.placeService.editPlace(updated_place).subscribe((place) => {
      this.store$.dispatch(editPlace(place))
      this.toggleEditPlace(false)
      this.showSelectBox =false;
    },error => {
      //@ts-ignore
      this.toastr.error(error.error[0].message, '',{
        timeOut: 3000,
      });
    })
  }

  handleAddPlace = () => {
    this.placeService.addPlace(this.new_place).subscribe((place) => {
      this.places.unshift(place)
      this.store$.dispatch(addPlace(place))
      this.toggleAddPlace()
    });
  }

  handleSearchPlace = () => {
    this.placeService.searchPlace(this.search_value).subscribe((places) => {
      //@ts-ignore
      this.places = places.map((item, i) => Object.assign({}, item, places[i]));
    });
  }
  public handleCRSSelectChangeCallback = (option: any | undefined) => {
    if(this.wantEditPlace){
      this.places.map((place) => {
        if(place.id === this.wantEditPlace){

          place.crs_id = option.id;
          //@ts-ignore
          place.crs = {...option}
        }
      })
    }
  }
  public handleBackgroundModeChangeCallback = (option: any | undefined) => {
    if(this.wantEditPlace){
      this.places.map((place) => {
        if(place.id === this.wantEditPlace){
          switch(option){
            case '8 румбов':
              place.background_mode = '8_rumb'
              break;
            case '4 румбов':
              place.background_mode = '4_rumb'
              break;
            case 'const':
              place.background_mode = 'const'
              break;
            default:

          }
        }
      })
    }
  }
}
