import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts.service';
import { MapComponent } from '../map/map.component';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  form!: FormGroup;
  @ViewChild('search')
  public searchElementRef!: ElementRef;

  placeIsNotSelected: boolean;
  latitude: number | undefined;
  longitude: number | undefined;

  constructor(@Inject(MapComponent) private map: MapComponent,
    private dialog: MatDialog,
    private postService: PostsService,
    public cd: ChangeDetectorRef) {
    this.placeIsNotSelected = true;
    this.form = new FormGroup({
      search: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.onChanges();
  }

  ngAfterViewInit() {

    const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      if (place) {
        this.latitude = place.geometry?.location?.lat();
        this.longitude = place.geometry?.location?.lng();
        this.placeIsNotSelected = false;
        this.cd.detectChanges();
      }
    });
  }

  onChanges(): void {
    this.form.valueChanges.subscribe(val => {
      if (!val.search) {
        this.placeIsNotSelected = true;
        this.cd.detectChanges();
      }
    });
  }

  openPopup(action: string) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      action: action
    };

    dialogConfig.position = {
      top: '10%',
      left: '33%'
    };

    const dialogRef = this.dialog.open(PopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        const post: Partial<Post> = {
          title: data.form?.title,
          content: data.form?.content,
          image_url: data.form?.image_url,
          lat: this.latitude,
          long: this.longitude
        }
        this.postService.createPost(post).subscribe(
          data => {
            //let coordinates: google.maps.LatLngLiteral = { lat: Number(post.lat), lng: Number(post.long) };
            this.map.createOrUpdateMarkers();
          }
        );
      }
    );
  }

}
