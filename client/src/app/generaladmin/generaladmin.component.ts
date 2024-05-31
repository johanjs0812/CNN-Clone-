import { Component, OnInit} from '@angular/core';
import { CategoryService } from '../services/category.service';
import { ArticlesService } from '../services/articles.service';
import { UsersService } from '../services/user.service';
import { CommentsService } from '../services/comment.service';

@Component({
  selector: 'app-generaladmin',
  templateUrl: './generaladmin.component.html',
  styleUrls: ['./generaladmin.component.css']
})

export class GeneraladminComponent implements OnInit{

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

    this.categoryService.getCategoriesData().subscribe(data => {
      this.categories = data;
    });

    this.articlesService.getarticlesData().subscribe(data => {
      this.articles = data;
    });

    this.usersService.getusersData().subscribe(data => {
      this.users = data;
    });

    this.commentsService.getcommentsData().subscribe(data => {
      this.comments = data;
    });
  }
}
