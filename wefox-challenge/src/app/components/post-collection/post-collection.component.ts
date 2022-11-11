import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-collection',
  templateUrl: './post-collection.component.html',
  styleUrls: ['./post-collection.component.scss']
})
export class PostCollectionComponent implements OnInit {

  constructor(
    private postService: PostsService
  ) { }

  posts: Post[] = [];
  hola: string = '';

  ngOnInit(): void {
    this.hola = 'holaaaa'
    this.postService.getPostList().subscribe(posts => {
      console.log('DATAA', posts);
      posts.forEach((post: Post) => {
        this.posts.push(post);
      });
      console.log('postssss', this.posts);
    })
  }

}
