import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CommentsService {
  private comments = new BehaviorSubject<any[]>([]);
  private cmtOnArt = new BehaviorSubject<any[]>([]);
  private selectedInfo: any = null;

  constructor(private http: HttpClient) { }

  // ADMIN
  getcomments(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/cnn/comments').pipe(
      tap(comments => this.comments.next(comments))
    );
  };

  delete(id: string, cmtOnArt: string, Art:string){
    try {
      this.http.delete(`http://localhost:3000/api/cnn/cmt/articles/delete/${id}/${cmtOnArt}/${Art}`).subscribe((response) => {
        console.log('Server response:', response);
        const currentcomments = this.comments.getValue();
        const index = currentcomments.findIndex(item => item._id.toString() === id);
        if (index !== -1) {
          currentcomments.splice(index, 1);
          this.comments.next(currentcomments);
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  getcommentsData(): Observable<any[]> {
    return this.comments.asObservable();
  }

  // USER
  updatedata(id: string, updatedData: any): Observable<any> {
    return this.http.put(`http://localhost:3000/api/cnn/comments/edit/${id}`, updatedData).pipe(
      tap(response => {
        console.log('Server response:', response);
        const currentcomments = this.cmtOnArt.getValue();
        const index = currentcomments.findIndex(item => item._id.toString() === id);
        if (index !== -1) {
          currentcomments[index] = response;
          this.cmtOnArt.next(currentcomments);
        }
      }),
      catchError(error => {
        console.error("Error occurred:", error);
        return throwError(error);
      })
    );
  };

  addData(data: any, article: string): Observable<any> {
    return this.http.post(`http://localhost:3000/api/cnn/comments/post/${article}`, data).pipe(
      tap(response => {
        console.log('Server response:', response);
        const currentcomments = this.cmtOnArt.getValue();
        currentcomments.push(response);
        this.cmtOnArt.next(currentcomments);
      })
    );
  };

  Userdelete(id: string, cmtOnArt: string, Art:string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/cnn/cmt/articles/delete/${id}/${cmtOnArt}/${Art}`).pipe(
      tap(response => {
        console.log('Server response:', response);
        const currentcomments = this.cmtOnArt.getValue();
        const index = currentcomments.findIndex(item => item._id.toString() === id);
        if (index !== -1) {
          currentcomments.splice(index, 1);
          this.cmtOnArt.next(currentcomments);
        }
      })
    );
  };

  getCmtOnArt(id: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/api/cnn/comments/onArt/${id}`).pipe(
      map(response => {
        console.log('Server response:', response);
        // Thay thế tất cả comment cũ bằng comment mới từ API
        const currentcomments = response;
        this.cmtOnArt.next(currentcomments);
        return currentcomments; // Trả về dữ liệu đã được biến đổi
      }),
      catchError(error => {
        console.error("Error occurred:", error);
        return throwError(error); // Xử lý lỗi
      })
    );
  }

  getcommentsOnArt(): Observable<any[]> {
    return this.cmtOnArt.asObservable();
  }

  // ========================
  setSelectedInfo(info: any) {
    this.selectedInfo = info;
  }

  getSelectedInfo(): any {
    return this.selectedInfo;
  }
}
