import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  apikey = 'Jr9Bp9n2aoO3fjm39IhXvJYeUZLyZZ8';
  favoritesCities: any = [];
  favoritesMap = new Map();
  favortiesCitiesCurrentWeather: any = [];
  constructor(private _httpClient: HttpClient) { }
  opts = [];
  
  private changeKey = new BehaviorSubject<any>('215854');
  cityKey = this.changeKey.asObservable();

  private changeName = new BehaviorSubject<any>('Tel Aviv');
  cityName = this.changeName.asObservable();

  private checkIfFavorite = new BehaviorSubject<any>('Tel Aviv');
  isFavorite = this.checkIfFavorite.asObservable();
  
 
  
  /// get 5 Five Days Forecasts By City Api Key///
  public getfiveDaysForecasts(cityKey: string) {
     return this._httpClient.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${this.apikey}&metric=true`);
  }
  
  changeCityKey(cityKey: any) {
    this.changeKey.next(cityKey);
  }

  changeCityName(cityName: any) {
    this.changeName.next(cityName);
  }

  isfavorite(isFavorite: any) {
    this.checkIfFavorite.next(isFavorite);
  }

  // get city key from api //  *get all city key that begin with first letter*
  public getCityKey(filterValue: string) {
    return this._httpClient.get<any>(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.apikey}&q=`+ filterValue)
   }
  
  /// get current weather of a city //
  public getCurrentWeather(cityKey: string) {
    return this._httpClient.get(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${this.apikey}`)
   }

  /// add city to favorites //
  public addCityToFavorites() {
      this.favoritesMap.set(this.changeKey.value, this.changeName.value);
      this.isfavorite(this.isFavorite);
  };
  
  // del city from favorties //
  public delCityFromFavorites() {
      this.favoritesMap.delete(this.changeKey.value);
      this.isfavorite(this.isFavorite);
  };
  
}