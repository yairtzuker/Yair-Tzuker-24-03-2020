
import {Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith,debounceTime } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-auto-complete-search',
  templateUrl: './auto-complete-search.component.html',
  styleUrls: ['./auto-complete-search.component.css']
})
export class AutoCompleteSearchComponent {

  myControl = new FormControl();
  options: string[] = [''];
  filteredOptions: Observable<string[]>;
  cityKey;
  currentCityKey;
  constructor(private _apiService: ApiService) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(1000),
        map(value => this._filter(value))
    )
  };

  private _filter(value: string): string[] {
    var filterValue = value.toLowerCase();

    if (filterValue != null && filterValue.length != 0) {
      this._apiService.getCityKey(filterValue).subscribe(cityKey => {
      this.currentCityKey = cityKey;
      let result = cityKey
      this.cityKey = result;
      var citySelectedKey = result.filter(filterValue => {
        return result.LocalizedName = filterValue;
      })
       
      cityKey = citySelectedKey[0]['Key'];
      var cityName = citySelectedKey[0]['LocalizedName'];
        this._apiService.changeCityKey(cityKey)
        this._apiService.changeCityName(cityName)
        this.options = this.cityKey.map(({ LocalizedName }) => LocalizedName);
        this.filteredOptions = this.myControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value))
          );
      })
      } else {
     return this.options.filter(option => option.includes(filterValue));
      }
  }
}