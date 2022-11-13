import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  /*@Input() imageUrl: string = '';
  @Input() content: string = '';
  @Input() title: string = '';
  @Input() latitude: Number = 0.0;
  @Input() longitude: Number = 0.0;*/
  @Input() post!: Post;
  @Input() isCreateAction!: boolean;

  @Output() closeInfoWindow = new EventEmitter<boolean>();


  constructor(private postService: PostsService,
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

    console.log('ACTION', action)

    dialogConfig.position = {
      top: '10%',
      left: '33%'
    };

    const dialogRef = this.dialog.open(PopupComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (action === 'edit' && data) {
          this.updatePost(data);
        }
        if (action === 'delete' && data) {
          this.deletePost(data.postId);
        }
      }
    );
  }

  updatePost(data: any) {
    this.postService.updatePost(data.postId, data.form).subscribe();
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe();
  }

}
