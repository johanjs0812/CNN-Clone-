import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationEnd } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-inputcate',
  templateUrl: './inputcate.component.html',
  styleUrls: ['./inputcate.component.css']
})

export class InputcateComponent implements OnInit{
  category = 'main';
  title = '';
  categories: any[] = [];
  selectedCategoryInfo: any;

  categoryName = '';
  categorySlug = '';
  categoryId = '';
  parentId = '';
  dataToSend = {};
  buttonChild : boolean = false;
  isHidden: boolean = false;

  constructor (private router: Router, private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService.getCategoriesData().subscribe(data => {
      this.categories = data;
    });

    this.selectedCategoryInfo = this.categoryService.getSelectedCategoryInfo();

    if (this.selectedCategoryInfo) {

        this.categoryName = this.selectedCategoryInfo.name;
        this.categorySlug = this.selectedCategoryInfo.slug;
        this.categoryId = this.selectedCategoryInfo.id;

        if (this.selectedCategoryInfo.parencate) {
          this.parentId = this.selectedCategoryInfo.parencate;
          this.buttonChild = true;
        }
    }

    const urlParts = this.router.url.split('/');
    const adminRoute = urlParts[2];

    if (adminRoute === 'addcategory') {
      this.isHidden = true;
      this.title = 'Add new category';
    }
    else {
      this.isHidden = false;
      this.title = 'Edit category';
    }
  }

  /// GET VALUE
  onNameInputChange(event: any) {
    this.categoryName = event.target.value;
  }

  onSlugInputChange(event: any) {
    this.categorySlug = event.target.value;
  }

  onParentInputChange(event: any) {
    this.parentId = event.target.value;
  }

  // FUNCTION

  add(){
    this.dataToSend = {
      name: this.categoryName,
      slug: this.categorySlug,
    };
    console.log('?????', this.dataToSend, this.parentId);
    if (this.parentId != '') {
      this.categoryService.addDataSub(this.parentId, this.dataToSend);
    }else{
      this.categoryService.addData(this.dataToSend);
    }
  }

  editCategory(categoryId: string) {
    this.dataToSend = {
      name: this.categoryName,
      slug: this.categorySlug,
    };
    console.log('??', this.dataToSend);
    this.categoryService.updateCategory(categoryId, this.dataToSend);
  }

  editCategoryChild(categoryId: string) {
    this.dataToSend = {
      name: this.categoryName,
      slug: this.categorySlug,
    };
    console.log('??', this.dataToSend);
    this.categoryService.updateSubCategory(this.parentId, categoryId, this.dataToSend);
  }
}
