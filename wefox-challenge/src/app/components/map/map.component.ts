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
  /*center: google.maps.LatLngLiteral = {
    lat: 50.378472,
    lng: 14.970598
  };*/
  icon = '../../assets/black-medium.png'


  markerPositions: google.maps.LatLngLiteral[] = [];

  mapOptions: google.maps.MapOptions = {
    center: { lat: 50.378472, lng: 14.970598 },
    zoom: 4,
    //mapId: '29e63aeffc1e697e',
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControlOptions: {
      mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"],
    },
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
    },
    /*{
      featureType: "landscape.natural",
      elementType: "geometry",
      stylers: [{ color: "#BDE39D" }],
    },*/]
  };



  //mapType = new google.maps.StyledMapType(this.style, { name: 'Grayscale' });


  /*styledMapType = new google.maps.StyledMapType(
     [
       { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
       { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
       { elementType: "labels.text.stroke", stylers: [{ color: "#f5f1e6" }] },
       {
         featureType: "administrative",
         elementType: "geometry.stroke",
         stylers: [{ color: "#c9b2a6" }],
       },
       {
         featureType: "administrative.land_parcel",
         elementType: "geometry.stroke",
         stylers: [{ color: "#dcd2be" }],
       },
       {
         featureType: "administrative.land_parcel",
         elementType: "labels.text.fill",
         stylers: [{ color: "#ae9e90" }],
       },
       {
         featureType: "landscape.natural",
         elementType: "geometry",
         stylers: [{ color: "#dfd2ae" }],
       },
       {
         featureType: "poi",
         elementType: "geometry",
         stylers: [{ color: "#dfd2ae" }],
       },
       {
         featureType: "poi",
         elementType: "labels.text.fill",
         stylers: [{ color: "#93817c" }],
       },
       {
         featureType: "poi.park",
         elementType: "geometry.fill",
         stylers: [{ color: "#a5b076" }],
       },
       {
         featureType: "poi.park",
         elementType: "labels.text.fill",
         stylers: [{ color: "#447530" }],
       },
       {
         featureType: "road",
         elementType: "geometry",
         stylers: [{ color: "#f5f1e6" }],
       },
       {
         featureType: "road.arterial",
         elementType: "geometry",
         stylers: [{ color: "#fdfcf8" }],
       },
       {
         featureType: "road.highway",
         elementType: "geometry",
         stylers: [{ color: "#f8c967" }],
       },
       {
         featureType: "road.highway",
         elementType: "geometry.stroke",
         stylers: [{ color: "#e9bc62" }],
       },
       {
         featureType: "road.highway.controlled_access",
         elementType: "geometry",
         stylers: [{ color: "#e98d58" }],
       },
       {
         featureType: "road.highway.controlled_access",
         elementType: "geometry.stroke",
         stylers: [{ color: "#db8555" }],
       },
       {
         featureType: "road.local",
         elementType: "labels.text.fill",
         stylers: [{ color: "#806b63" }],
       },
       {
         featureType: "transit.line",
         elementType: "geometry",
         stylers: [{ color: "#dfd2ae" }],
       },
       {
         featureType: "transit.line",
         elementType: "labels.text.fill",
         stylers: [{ color: "#8f7d77" }],
       },
       {
         featureType: "transit.line",
         elementType: "labels.text.stroke",
         stylers: [{ color: "#ebe3cd" }],
       },
       {
         featureType: "transit.station",
         elementType: "geometry",
         stylers: [{ color: "#dfd2ae" }],
       },
       {
         featureType: "water",
         elementType: "geometry.fill",
         stylers: [{ color: "#b9d3c2" }],
       },
       {
         featureType: "water",
         elementType: "labels.text.fill",
         stylers: [{ color: "#92998d" }],
       },
     ],
     { name: "Styled Map" }
   );*/


  constructor(httpClient: HttpClient,
    private postService: PostsService) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyDGzuy93OyEVLpW44Byyz_HHAFM5kA-Bj8', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }


  ngOnInit(): void {
    this.postService.getPostList().subscribe(posts => {
      posts.forEach((post: Post) => {
        this.posts.push(post);
        let coordinates: google.maps.LatLngLiteral = { lat: Number(post.lat), lng: Number(post.long) };
        this.markerPositions.push(coordinates);
      });
    })
  }


  /*addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }*/

  openInfoWindow(marker: MapMarker) {

    if (this.infoWindow != undefined) {
      let latitude = marker.getPosition()?.toJSON().lat;
      let longitude = marker.getPosition()?.toJSON().lng;
      this.post = this.posts.find(p => (Number(p.lat) === latitude && Number(p.long) === longitude))
      this.infoWindow.open(marker);
      if (this.mapOptions.styles && this.mapOptions.styles.length > 0) {
        //this.mapOptions.styles[0]
        let styles = {
          featureType: 'all',
          elementType: 'all',
          stylers: [{ saturation: -90 }, { hue: 20 }],
        };
        
        this.mapOptions.styles?.pop()
        this.mapOptions.styles?.push(styles)

        console.log(this.mapOptions.styles)

        
        
      }

     
     

     
     
    }
  }
}
