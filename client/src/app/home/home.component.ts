import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  articles: any[] = [];
  categories: any[] = [];
  subCategoryArticles: {[key: string]: any[]} = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/cnn/articles').subscribe((articles: any[]) => {
      this.articles = articles;

      this.http.get<any[]>('http://localhost:3000/api/cnn/category').subscribe((categories: any[]) => {
        this.categories = categories;
        for (let category of this.categories) {
          for (let subcategory of category.subcategories) {
            subcategory.firstArticleShown = false;
            this.getSubCategoryArticles(subcategory._id);
          }
        }
      });
    });
  }

  getSubCategoryArticles(subCategoryId: string): void {
    let subCategoryArticles = this.articles.filter(article => article.categoryId === subCategoryId);
    this.subCategoryArticles[subCategoryId] = subCategoryArticles;
  }

}




