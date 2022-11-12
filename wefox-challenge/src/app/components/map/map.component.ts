import { Component, Input, OnInit, ViewChild } from '@angular/core';


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

  

  ngOnInit(): void {
    
  }


  ngAfterViewInit() {

  }

  prueba() {
console.log('holaaaaa')
  }
}