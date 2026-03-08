import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, using } from 'rxjs';
import { CategoryListResponse, CategoryResponse } from '../models/interfaces/category-response.interface';
import { CategoryDto } from '../models/dto/category.dto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  urlBase = 'http://localhost:8080/api/v1/categories';

  constructor(private http: HttpClient) { }

  createCategory(category: CategoryDto): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(`${this.urlBase}/admin`, category);
  }

  getCategories(numPage: number): Observable<CategoryListResponse> {
    return this.http.get<CategoryListResponse>(`${this.urlBase}?page=${numPage}`);
  }

  getCategory(id: number): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.urlBase}/${id}`);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/admin/${id}`);
  }

  editCategory(id: number, editCategory: CategoryDto): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(`${this.urlBase}/admin/${id}`, editCategory);
  }

}
