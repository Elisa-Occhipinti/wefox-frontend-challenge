import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { catchError, map, Observable, of, tap } from 'rxjs';
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
  post: any;
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;
  @ViewChild('map') map: any;
  @ViewChild('postComponent') postComponent!: any;

  isCreateAction: boolean = false;
  markerPositions: google.maps.LatLngLiteral[] = [];

  mapOptions: google.maps.MapOptions = {
    center: { lat: 50.378472, lng: 14.970598 },
    zoom: 4,
    disableDefaultUI: true,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    scaleControl: true,
    rotateControl: false,
    restriction: {
      latLngBounds: {
        north: 89,
        south: -89,
        west: -179,
        east: 179
      },
      strictBounds: true
    },
    styles: [{
      featureType: 'all',
      elementType: 'all',
      stylers: [{ saturation: -40 }, { hue: 20 }],
    }]
  };

  constructor(httpClient: HttpClient,
    private postService: PostsService) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyDGzuy93OyEVLpW44Byyz_HHAFM5kA-Bj8&libraries=places', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit(): void {
    this.createOrUpdateMarkers();
  }

  createOrUpdateMarkers() {
    this.posts.pop();
    this.markerPositions.pop();
    this.postService.getPostList().subscribe(posts => {
      posts.forEach((post: Post) => {
        this.posts.push(post);
        let coordinates: google.maps.LatLngLiteral = { lat: Number(post.lat), lng: Number(post.long) };
          this.markerPositions.push(coordinates);
      });
    })
  }

  openInfoWindow(marker: MapMarker) {
    if (this.infoWindow != undefined) {
      let latitude = marker.getPosition()?.toJSON().lat;
      let longitude = marker.getPosition()?.toJSON().lng;
      this.post = this.posts.find(p => (Number(p.lat) === latitude && Number(p.long) === longitude))
      this.infoWindow.open(marker);
    }
  }

  closeInfoWindow(event: boolean) {
    if (event) {
      this.infoWindow?.close();
    }
  }
}
