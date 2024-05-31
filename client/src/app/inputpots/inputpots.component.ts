import { Component, ViewChild, AfterViewChecked, OnInit, ElementRef } from '@angular/core';
import { Event, Router, NavigationEnd } from '@angular/router';
import { QuillEditorComponent } from 'ngx-quill';
import { CategoryService } from '../services/category.service';
import { ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-inputpots',
  templateUrl: './inputpots.component.html',
  styleUrls: ['./inputpots.component.css']
})

export class InputpotsComponent implements AfterViewChecked, OnInit {
  @ViewChild('editor') editor!: QuillEditorComponent;
  @ViewChild('fileInput') fileInput!: ElementRef;
  imgSrc: string | ArrayBuffer = '';

  content = '';
  initialized = false;
  isHidden = false;
  imgHide = true;
  page = '';
  title= '';
  selectedInfo: any;
  categories: any[] = [];
  articles: any[] = [];
  dataToSend = {};
  img = '';
  postid = '';
  categoryId = '';
  categoryname = '';

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private articlesService: ArticlesService
  ) {  };

  ngOnInit (){
    this.categoryService.getCategoriesData().subscribe(data => {
      this.categories = data;
    });

    this.articlesService.getarticles().subscribe(data => {
      this.articles = data;
      console.log('data', this.articles)
    });

    const urlParts = this.router.url.split('/');
    const adminRoute = urlParts[2];

    if (adminRoute === 'addpots') {
      this.isHidden = true;
      this.imgHide = true;
      this.page = 'Add new post';
    }
    else {
      this.imgHide = false;
      this.isHidden = false;
      this.page = 'Edit post';

      this.selectedInfo = this.articlesService.getSelectedInfo();
      this.content = this.selectedInfo.content;
      this.imgSrc = this.selectedInfo.img;
      this.title = this.selectedInfo.title;
      this.postid = this.selectedInfo.id;
      this.categoryId = this.selectedInfo.cateid;
    }
  };

  ngAfterViewChecked() {
    if (!this.initialized && this.editor && this.editor.quillEditor) {
      let html = '<p><strong>dadadda 145</strong></p>';
      this.editor.quillEditor.clipboard.dangerouslyPasteHTML(html);
      this.initialized = true;
    }
  };

  //THAY ẢNH
  openFilePicker() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => {
        if (reader.result !== null) {
          this.imgSrc = reader.result;
          this.imgHide = false;
        } else {
          return;
        }
      };

      reader.readAsDataURL(file);
    }
  };

  //LẤY VALUE

  onTitleInputChange(event: any) {
    this.title = event.target.value;
  }

  onOptionChange(event: any) {
    this.categoryId = event.target.value;
  }

  edit(id: string) {
    this.dataToSend = {
      title: this.title,
      content: this.content,
      img: this.imgSrc,
      categoryId: this.categoryId
    };
    console.log('??', this.dataToSend, id);
    this.articlesService.updatedata(id, this.dataToSend);
  }

  add(){
    this.dataToSend = {
      title: this.title,
      content: this.content,
      img: this.imgSrc,
      categoryId: this.categoryId
    };
    console.log('??', this.dataToSend);
    this.articlesService.addData(this.dataToSend);
  }

}
