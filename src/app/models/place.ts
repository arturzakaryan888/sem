export class Place {
  air_density?: number | string;
  avg_temperature_of_could_month?: number;
  avg_temperature_of_warm_month?: string;
  background_mode?: string;
  background_source_id?: number;
  code?: string;
  id?: number;
  name?: string;
  population?: number;
  relief_coefficient?: number;
  square?: number;
  stratification_coefficient?: number;
  u_speed?: number
  crs_id?: number;
  crs?: {
    name?: string;
    id?: number
  };
}
