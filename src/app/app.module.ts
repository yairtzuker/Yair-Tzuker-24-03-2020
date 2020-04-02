import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule} from '@angular/common/http';
import { ApiService } from './services/api.service';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material/select';


import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AutoCompleteSearchComponent } from './components/auto-complete-search/auto-complete-search.component';
import { from } from 'rxjs';



const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    
    FavoritesComponent,
    PageNotFoundComponent,
    AutoCompleteSearchComponent,
    
  ],
  imports: [
    BrowserModule,
      RouterModule.forRoot(
        appRoutes,
        
       
      ),
    
    AppRoutingModule,
    HttpClientModule,
    MatAutocompleteModule, MatInputModule, BrowserAnimationsModule,
    MatFormFieldModule, MatButtonModule, ReactiveFormsModule, FormsModule,MatSelectModule
  ],

  
 
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
