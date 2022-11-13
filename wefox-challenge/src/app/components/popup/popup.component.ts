import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from 'src/app/interfaces/post';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  form!: FormGroup;
  /*description!: string;
  title!: string;
  content!: string;*/
  action!: string;
  post!: Post;
  isEditOrCreateAction: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {

    /*this.post = {
      id: data.id,
      title: data.title,
      content: data.content,
      lat: data.lat,
      long: data.long,
      image_url: data.image
    }*/

    if (data.post) {
      this.post = data.post;
    }

    this.action = data.action;
    this.action === 'edit' || this.action === 'create' ? this.isEditOrCreateAction = true : this.isEditOrCreateAction = false;
    console.log('popup POST ', this.post)
    console.log('popup ACTION', this.action)
    this.form = new FormGroup({
      title: new FormControl(),
      content: new FormControl(),
      image_url: new FormControl()
    });

  }



  ngOnInit() {
    console.log(this.post)
    if (this.action === 'edit') {
      this.form.get('title')?.setValue(this.post.title);
      this.form.get('content')?.setValue(this.post.content);
      this.form.get('image_url')?.setValue(this.post.image_url);
    }
  }

  save() {
    console.log('SAVE ACTION', this.action)
    //this.newItemEvent.emit(this.action, this.post.id);
    /*const value = {
      form: this.form.value,
      postId: this.post.id
    };*/
    const value = this.setData();
    this.dialogRef.close(value);
  }

  close() {
    this.dialogRef.close();
  }

  setData(): any {
    switch (this.action) {
      case 'create': {
        return {
          form: this.form.value
        };
      }
      case 'edit': {
        return {
          form: this.form.value,
          postId: this.post.id
        };
      }
      case 'delete': {
        return {
          postId: this.post.id
        };
      }
    }
  }



}

