import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Event, Router, NavigationEnd } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ArticlesService } from '../services/articles.service';
import { UsersService } from '../services/user.service';
import { CommentsService } from '../services/comment.service';

@Component({
  selector: 'app-listdata',
  templateUrl: './listdata.component.html',
  styleUrls: ['./listdata.component.css']
})

export class ListdataComponent implements OnInit{

  categories: any[] = [];
  articles: any[] = [];
  users: any[] = [];
  comments: any[] = [];

  items = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 2' },
    { name: 'Item 2' },
  ];

  isModalOpen = this.items.map(() => false);

  isHovering: { [key: string]: boolean } = {};

  selectedItem = 0;

  isHidden: boolean = false;
  title: string = '';
  collection: number = NaN;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private articlesService: ArticlesService,
    private usersService: UsersService,
    private commentsService: CommentsService,
  ) {  };

  ngOnInit() {

    this.loadData();

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd event triggered');
        this.loadData();
      }
    });

    // ===============

    const urlParts = this.router.url.split('/');
    const adminRoute = urlParts[2];

    switch (adminRoute) {
      case 'categories':
        this.title = 'Categories';
        this.isHidden = true;
        this.collection = 0;
        this.selectedItem = 0;
        break;

      case 'pots':
        this.title = 'Posts';
        this.isHidden = true;
        this.collection = 1;
        this.selectedItem = 1;
        break;

      case 'users':
        this.title = 'Users';
        this.isHidden = true;
        this.collection = 2;
        this.selectedItem = 2;
        break;

      case 'comments':
        this.title = 'Comments';
        this.isHidden = true;
        this.collection = 3;
        this.selectedItem = 3;
        break;

      case 'home':
        this.title = '';
        this.collection = NaN;
        this.selectedItem = 0;
        break;

      default:
        this.title = '';
        this.collection = NaN;
        this.selectedItem = 0;
    }

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

  // =========XU LY TABLE TAI TRANG HOME
  selectItem(index: number, event:MouseEvent ) {
    event.preventDefault();
    this.selectedItem = index;
  };

  // =========HOVER DATA

  openModal(index: number) {
    this.isModalOpen[index] = true;
  }

  closeModal(index: number) {
    this.isModalOpen[index] = false;
  }

  // ==========Xu ly SUB HOVER

  onMouseEnter(i: number, j: number) {
    this.isHovering[`${i}-${j}`] = true;
  }

  onMouseLeave(i: number, j: number) {
    this.isHovering[`${i}-${j}`] = false;
  }

  isHoveringOn(i: number, j: number): boolean {
    return this.isHovering[`${i}-${j}`];
  }

  // ======================= GET ID TO SERVICE
  editOrDeleteToService(x: any) {
    const id = x._id;
    const name = x.name;
    const slug = x.slug;

    const title = x.title;
    const img = x.img;
    const content = x.content;
    const cateid = x.categoryId;

    const username = x.username;
    const password = x.password;
    const email = x.email;
    const role = x.role;

    this.categoryService.setSelectedCategoryInfo({id, name, slug});
    this.articlesService.setSelectedInfo({id, title, img, content, cateid});
    this.usersService.setSelectedInfo({id, username, password, email, role});
  };

  //ARTICLES
  delete(id : string){
    this.articlesService.delete(id);
  }

  //CATEGORY
  deletecate(parent: string | null, id: string) {
    if (parent) {
      this.categoryService.deleteSubCategory(parent, id);
    } else {
      this.categoryService.delete(id);
    }
  }

  //EDIT SUB CATE
  editOrDeleteCategoryChild(subcategory: any, category: any) {
    const categoryId = subcategory._id;
    const parencate = category._id;
    const name = subcategory.name;
    const slug = subcategory.slug;

    this.categoryService.setSelectedCategoryInfo({categoryId, name, slug, parencate});
  };

  //USERS
  deleteuser(id : string){
    this.usersService.delete(id);
  }

  //COMMENT
  deletecmt(id : string, cmtOnArt:string, Art: string){
    this.commentsService.delete(id, cmtOnArt, Art);
  }

}
