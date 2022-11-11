import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() imageUrl: string = '';
  @Input() content: string = '';
  @Input() title: string = '';
  @Input() latitude: Number = 0.0;
  @Input() longitude: Number = 0.0;

  
  constructor() { }

  ngOnInit(): void {
   console.log(this.imageUrl)
  }

  ngAfterViewInit() {
    
  }

}
