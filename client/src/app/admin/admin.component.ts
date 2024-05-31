import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ArticlesService } from '../services/articles.service';
import { UsersService } from '../services/user.service';
import { CommentsService } from '../services/comment.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  categories: any[] = [];
  articles: any[] = [];
  users: any[] = [];
  comments: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private articlesService: ArticlesService,
    private usersService: UsersService,
    private commentsService: CommentsService,
  ) {  };

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {

    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });

    this.articlesService.getarticles().subscribe(data => {
      this.articles = data;
    });

    this.usersService.getusers().subscribe(data => {
      this.users = data;
    });

    this.commentsService.getcomments().subscribe(data => {
      this.comments = data;
    });
  }
}

