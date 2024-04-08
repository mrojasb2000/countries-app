import { Country } from "./country.interfaces";
import { Region } from "./region.type";

export interface CacheStore {
  byCapital: TermCountry;
  byCountry: TermCountry
  byRegion: RegionCountries;
}

export interface TermCountry {
  term: string;
  countries: Country[];
}

export interface RegionCountries {
  region?: Region;
  countries: Country[];
}
