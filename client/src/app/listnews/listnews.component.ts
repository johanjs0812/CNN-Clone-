import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listnews',
  templateUrl: './listnews.component.html',
  styleUrls: ['./listnews.component.css']
})

export class ListnewsComponent implements OnInit{
  category: any;
  articles: {[key: string]: any[]} = {};

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let categoryId = params['id'];

      this.http.get<any>(`http://localhost:3000/api/cnn/category/${categoryId}`).subscribe((category: any) => {
        this.category = category;

        for (let subcategory of category.subcategories) {
          this.getSubCategoryArticles(subcategory._id);
        }
      });
    });
  }

  getSubCategoryArticles(subCategoryId: string): void {
    this.http.get<any[]>(`http://localhost:3000/api/cnn/listnews/${subCategoryId}`).subscribe((articles: any[]) => {
      this.articles[subCategoryId] = articles;
    });
  }
}
