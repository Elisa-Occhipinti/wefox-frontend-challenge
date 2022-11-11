import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import Map from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import * as Coordinate from 'ol/coordinate';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import Overlay from 'ol/Overlay';
import Control from 'ol/control/Control';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  @Input() centerCoordinate = [7.0785, 51.4614];
  @Input() zoom: Number = 3;

  @ViewChild('map') target: any;
  @ViewChild('popup') element: any;

  map: any;
  vectorSource: any;
  vectorLayer: any;
  marker: any;
  tileLayer: any;
  view: any;
  popup: any;
  styles: any = {
    route: new Style({
      stroke: new Stroke({
        width: 6,
        color: [237, 212, 0, 0.8],
      }),
    }),
    icon: new Style({
      image: new Icon({
        anchor: [0.5, 1],
        src: "data/icon.png",
      }),
    }),
    geoMarker: new Style({
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({ color: "black" }),
        stroke: new Stroke({
          color: "white",
          width: 2,
        }),
      }),
    }),
  };

  ngOnInit(): void {
    if (this.element) {
      this.element.changes.subscribe();
    }

    this.tileLayer = new TileLayer({
      source: new OSM(),
    });

    this.marker = new Feature({
      type: "geoMarker",
      geometry: new Point(olProj.fromLonLat(this.centerCoordinate)),
    });

    this.vectorSource = new VectorSource({
      features: [this.marker],
    });

    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: (feature) => {
        return this.styles[feature.get("type")];
      },
    });

    this.view = new View({
      center: olProj.fromLonLat(this.centerCoordinate),
      zoom: <number>this.zoom,
    });



    this.map = new Map({
      controls: [],
      interactions: [],
      //target: this.id,
      layers: [this.tileLayer, this.vectorLayer],
      view: this.view,
    });
  }


  ngAfterViewInit() {

    this.map.setTarget(this.target.nativeElement);
    const element = this.element.nativeElement;
    // if (this.element) {
    /*this.popup = new Overlay({
      element: this.element.nativeElement,
      stopEvent: false,
    });

    this.map.addOverlay(this.popup);
    //}

    /*const myControl = new Control({ element: element });
    myControl.addEventListener('onmousemove', this.prueba);
    this.map.addControl(myControl);*/
    //this.map.on('onselect', this.prueba());
 

  }

  prueba() {
console.log('holaaaaa')
  }
}