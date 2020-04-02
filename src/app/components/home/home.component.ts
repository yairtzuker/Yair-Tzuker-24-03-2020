import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fiveDaysForecasts: any;
  cityName: string;
  currentWeatherCity;
  temp = [];
  cityKey;
  isFavorite: boolean = false;
  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this.cityKey = '215854'
    this._apiService.cityKey.subscribe(cityKey => {
      
      this.cityKey = cityKey;
      
      this._apiService.cityName.subscribe(cityName => {
       
        this.cityName = cityName;
        
        this._apiService.getCurrentWeather(cityKey).subscribe(data => {
          console.log(data);
          this.currentWeatherCity = data;
          this.temp = data[0].Temperature.Metric.Value;
           
      /// check if this city is saved on favorites //
      this._apiService.isFavorite.subscribe(isFavorite => {
          this.isFavorite = this._apiService.favoritesMap.has(this.cityKey);
         
      
        /// get five days forecasts for city
      this._apiService.getfiveDaysForecasts(cityKey).subscribe(data => {
        this.fiveDaysForecasts = data['DailyForecasts']
      });
      })
        // get city current weather //
      })
     
        })
       }
    )}

  addToFavorites() {
   this._apiService.favortiesCitiesCurrentWeather.push({cityKey:this.cityKey, currentWeather:this.currentWeatherCity})
    this._apiService.addCityToFavorites();
    console.log(this._apiService.favortiesCitiesCurrentWeather);
    
  }

  delFromFavorites() {
    this._apiService.delCityFromFavorites(); 
    }
}
