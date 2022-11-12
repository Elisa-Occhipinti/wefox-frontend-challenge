import { NgModule } from '@angular/core';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { PostCollectionComponent } from './components/post-collection/post-collection.component';
import { PopupComponent } from './components/popup/popup.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostCollectionComponent,
    PopupComponent,
    MapComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    BrowserModule,
    GoogleMapsModule,
    HttpClientJsonpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
