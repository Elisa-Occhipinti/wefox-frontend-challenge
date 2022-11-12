import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { catchError, map, Observable, of } from 'rxjs';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  apiLoaded: Observable<boolean>;
  posts: Post[] = [];

  constructor(httpClient: HttpClient,
    private postService: PostsService) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyDGzuy93OyEVLpW44Byyz_HHAFM5kA-Bj8', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

@ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
center: google.maps.LatLngLiteral = {
  lat: 50.378472,
  lng: 14.970598
};

markerPositions: google.maps.LatLngLiteral[] = [];
zoom = 4;

ngOnInit(): void {
  this.postService.getPostList().subscribe(posts => {
    posts.forEach((post: Post) => {
      this.posts.push(post);
      let coordinates: google.maps.LatLngLiteral = {lat: Number(post.lat), lng: Number(post.long)}
      this.markerPositions.push(coordinates);
    });
  })
}

/*addMarker(event: google.maps.MapMouseEvent) {
  if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
}*/

openInfoWindow(marker: MapMarker) {
  if (this.infoWindow != undefined) this.infoWindow.open(marker);
}
}
