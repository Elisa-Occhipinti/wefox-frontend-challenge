import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Actions } from 'src/app/enums/actions';
import { Post } from 'src/app/interfaces/post';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  form!: FormGroup;
  action!: string;
  post!: Post;
  isEditOrCreateAction: boolean = false;
  okButtonLabel: string = 'OK';

  constructor(
    private dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {

    if (data.post) {
      this.post = data.post;
    }

    this.action = data.action;
    this.action === Actions.EDIT || this.action === Actions.CREATE ? this.isEditOrCreateAction = true : this.isEditOrCreateAction = false;
    this.action === Actions.EDIT || this.action === Actions.CREATE ? this.okButtonLabel = 'Save' : this.okButtonLabel = 'Delete';
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      image_url: new FormControl()
    });

  }

  ngOnInit() {
    if (this.action === Actions.EDIT) {
      this.form.get('title')?.setValue(this.post.title);
      this.form.get('content')?.setValue(this.post.content);
      this.form.get('image_url')?.setValue(this.post.image_url);
    }
  }

  save() {
    const value = this.setData();
    this.dialogRef.close(value);
  }

  close() {
    this.dialogRef.close();
  }

  setData(): any {
    switch (this.action) {
      case Actions.CREATE: {
        return {
          form: this.form.value
        };
      }
      case Actions.EDIT: {
        return {
          form: this.form.value,
          post: this.post
        };
      }
      case Actions.DELETE: {
        return {
          post: this.post
        };
      }
    }
  }



}

