import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Post } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  apiUrl: string = 'http://localhost:3000/api/v1/posts';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  // List
  getPostList() {
    return this.http.get(`${this.apiUrl}`);
  }

  // Show
  getPost(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Create
  createPost(data: Post): Observable<any> {
    //let url = `${this.apiUrl}/create-task`;
    return this.http.post(this.apiUrl, data).pipe(catchError(this.error));
  }

  // Update
  updatePost(id: number, data: any): Observable<any> {
    let url = `${this.apiUrl}/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  // Delete
  deletePost(id: number): Observable<any> {
    var url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(catchError(this.error));
  }

  // Handle Errors
  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
