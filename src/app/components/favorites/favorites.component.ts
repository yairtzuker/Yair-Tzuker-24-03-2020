import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  allCities;
  data;
  constructor(private _apiService: ApiService, private _router: Router) { }

    
  ngOnInit(): void {
    
    this.data = Array.from(this._apiService.favoritesMap)
    var res = this.data;
    var weather = this._apiService.favortiesCitiesCurrentWeather;
    /// func to push current weather only for the favorite city from local data //
    var i;
    var b;
    for (i = 0; i < res.length; i++) {
      for (b = 0; b < weather.length; b++) {
        if (weather[b].cityKey == res[i][0]) {
          res[i].push(weather[b].currentWeather[0])
         }
      }
    }
    
    this.allCities = res;
    
  }
  loadThisFavorite(city) {
    var cityKey = city[0];
    this._apiService.changeCityKey(cityKey)
    this._router.navigate(['/'])
  }
}