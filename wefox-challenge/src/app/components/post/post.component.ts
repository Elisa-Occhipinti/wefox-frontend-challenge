import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Actions } from 'src/app/enums/actions';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts.service';
import { MapComponent } from '../map/map.component';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post!: Post;
  @Input() isCreateAction!: boolean;

  @Output() closeInfoWindow = new EventEmitter<boolean>();

  constructor(@Inject(MapComponent) private map: MapComponent,
    private postService: PostsService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openPopup(post: Post, action: string) {

    const dialogConfig = new MatDialogConfig();
    this.closeInfoWindow.emit(true);

    dialogConfig.data = {
      post: {
        id: post?.id,
        title: post?.title,
        content: post?.content,
        image_url: post?.image_url
      },
      action: action
    };

    dialogConfig.position = {
      top: '10%',
      left: '33%'
    };

    const dialogRef = this.dialog.open(PopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (action === Actions.EDIT && data) {
          this.updatePost(data);
        }
        if (action === Actions.DELETE && data) {
          this.deletePost(data);
        }
      }
    );
  }

  updatePost(data: any) {
    this.postService.updatePost(data.post.id, data.form).subscribe(response => {
      this.map.createOrUpdateMarkers();
    });
  }

  deletePost(data: any) {
    this.postService.deletePost(data.post.id).subscribe(response => {
      this.map.createOrUpdateMarkers();
    });
  }

}
