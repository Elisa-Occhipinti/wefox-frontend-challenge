import { Component, Input, OnInit } from '@angular/core';
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
  @Input()
  post!: Post;


  constructor(private postService: PostsService,
    private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openPopup(post: Post, action: string) {
    const dialogConfig = new MatDialogConfig();

    //dialogConfig.disableClose = false;
    //dialogConfig.autoFocus = true;

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
      data => console.log("Dialog output:", data)
    );
  }



  updatePost(post: Post) {
    //this.postService.updatePost(post.id, ).subscribe();
  }

  deletePost() {

  }

}
