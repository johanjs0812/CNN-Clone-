import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private categories = new BehaviorSubject<any[]>([]);
  private selectedCategoryInfo: any = null;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/cnn/category').pipe(
      tap(categories => this.categories.next(categories))
    );
  };

  updateCategory(id: string, updatedData: any): void {
    try {
      this.http.put(`http://localhost:3000/api/cnn/category/put/${id}`, updatedData).subscribe((response) => {
        console.log('Server response:', response);
        const currentCategories = this.categories.getValue();
        const index = currentCategories.findIndex(category => category._id.toString() === id);
        if (index !== -1) {
          currentCategories[index] = response;
          this.categories.next(currentCategories);
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  updateSubCategory(parentId: string, id: string, updatedData: any): void {
    try {
      this.http.put(`http://localhost:3000/api/cnn/category/subcategory/put/${parentId}/${id}`, updatedData).subscribe((response) => {
        const currentCategories = this.categories.getValue();
        const parentCategory = currentCategories.find(category => category._id.toString() === parentId);
        if (parentCategory && parentCategory.subcategories) {
          // Tìm sub category trong parent category dựa trên id
          const subCategory = parentCategory.subcategories.find((sub: any) => sub._id.toString() === id);
          if (subCategory) {
            // Cập nhật sub category bằng dữ liệu từ updatedData
            Object.assign(subCategory, updatedData);
            this.categories.next(currentCategories);
          }
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  addData(data: any){
    try {
      this.http.post(`http://localhost:3000/api/cnn/category/post`, data).subscribe((response) => {
        console.log('Server response:', response);
        const currentarticles = this.categories.getValue();
        currentarticles.push(response);
        this.categories.next(currentarticles);
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  addDataSub(parentId:string, data: any){
    try {
      this.http.patch(`http://localhost:3000/api/cnn/category/subcategory/add/${parentId}`, data).subscribe((response) => {
        console.log('Server response:', response);
        const currentarticles = this.categories.getValue();
        currentarticles.push(response);
        this.categories.next(currentarticles);
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  delete(id: string){
    try {
      this.http.delete(`http://localhost:3000/api/cnn/category/del/${id}`).subscribe((response) => {
        console.log('Server response:', response);
        const currentcategories = this.categories.getValue();
        const index = currentcategories.findIndex(categories => categories._id.toString() === id);
        if (index !== -1) {
          currentcategories.splice(index, 1);
          this.categories.next(currentcategories);
        }
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }

  deleteSubCategory(parentId: string, subcategoryId: string): void {
      try {
        this.http.patch(`http://localhost:3000/api/cnn/category/subcategory/delete/${parentId}/${subcategoryId}`, {}).subscribe((response) => {
          const currentCategories = this.categories.getValue();
          const parentCategory = currentCategories.find(category => category._id.toString() === parentId);
          if (parentCategory && parentCategory.subcategories) {
            // Tìm index của sub category trong parent category dựa trên id
            const subCategoryIndex = parentCategory.subcategories.findIndex((sub: any) => sub._id.toString() === subcategoryId);
            if (subCategoryIndex !== -1) {
              // Xóa sub category khỏi mảng
              parentCategory.subcategories.splice(subCategoryIndex, 1);
              this.categories.next(currentCategories);
            }
          }
        });
      } catch (error) {
        console.error("Error occurred:", error);
      }
  };


  // ==========================

  getCategoriesData(): Observable<any[]> {
    return this.categories.asObservable();
  }

  // ========================
  setSelectedCategoryInfo(info: any) {
    this.selectedCategoryInfo = info;
  }

  getSelectedCategoryInfo(): any {
      return this.selectedCategoryInfo;
  }
}
