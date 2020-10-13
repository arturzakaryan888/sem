import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Place} from "../../models/place";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  constructor(private http: HttpClient) {
  }

  getAllPlaces = (current_page : number) => {
    return this.http.get<any>('places?fields=id,name,crs_id,crs.name,crs.id,u_speed,population,square,stratification_coefficient,air_density,relief_coefficient,avg_temperature_of_could_month,avg_temperature_of_warm_month,background_mode&expand=crs&page=' + current_page + '&per-page=2', { observe: 'response' });
  }
  getAllPlacesWithCrs = () => {
    return this.http.get('places');
  }
  deletePlace = (place_id: number) => {
    return this.http.delete('places/' + place_id);
  }
  addPlace = (new_place: Place) => {
    return this.http.post('places?fields=id,name,crs_id,crs.name,crs.id,u_speed,population,square,stratification_coefficient,air_density,relief_coefficient,avg_temperature_of_could_month,avg_temperature_of_warm_month,background_mode&expand=crs', new_place);
  }
  editPlace = (updated_place: Place) => {
    return this.http.put('places/' + updated_place.id, updated_place);
  }
  searchPlace = (keyword: string) => {
    return this.http.get('places?fields=id,name,crs_id,crs.name,crs.id,u_speed,population,square,stratification_coefficient,air_density,relief_coefficient,avg_temperature_of_could_month,avg_temperature_of_warm_month,background_mode&expand=crs&filter[query]=' + keyword);
  }
  getCoordinates = () => {
    return this.http.get('coordinate/coordinate-reference-systems?fields=id,code,name&per-page=9007199254740991');
  }
}
