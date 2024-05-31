import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ArticlesService {
  private articles = new BehaviorSubject<any[]>([]);
  private selectedInfo: any = null;

  constructor(private http: HttpClient) { }

  getarticles(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/cnn/articles').pipe(
      tap(articles => this.articles.next(articles))
    );
  };

  updatedata(id: string, updatedData: any): void {
    try {
      this.http.put(`http://localhost:3000/api/cnn/articles/edit/${id}`, updatedData).subscribe((response) => {
        console.log('Server response:', response);
        const currentarticles = this.articles.getValue();
        const index = currentarticles.findIndex(category => category._id.toString() === id);
        if (index !== -1) {
          currentarticles[index] = response;
          this.articles.next(currentarticles);
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  addData(data: any){
    try {
      this.http.post(`http://localhost:3000/api/cnn/articles/post/`, data).subscribe((response) => {
        console.log('Server response:', response);
        console.log('them?', response);
        const currentarticles = this.articles.getValue();
        currentarticles.push(response);
        this.articles.next(currentarticles);
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  delete(id: string){
    try {
      this.http.delete(`http://localhost:3000/api/cnn/articles/delete/${id}`).subscribe((response) => {
        console.log('Server response:', response);
        const currentarticles = this.articles.getValue();
        const index = currentarticles.findIndex(article => article._id.toString() === id);
        if (index !== -1) {
          currentarticles.splice(index, 1);
          this.articles.next(currentarticles);
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }

  getarticlesData(): Observable<any[]> {
    return this.articles.asObservable();
  }

  // ========================
  setSelectedInfo(info: any) {
    this.selectedInfo = info;
  }

  getSelectedInfo(): any {
      return this.selectedInfo;
  }
}
