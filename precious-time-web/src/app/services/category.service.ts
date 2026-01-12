import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, using } from 'rxjs';
import { CategoryListResponse, CategoryResponse } from '../models/interfaces/category-response.interface';
import { CategoryDto } from '../models/dto/category.dto';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  urlBase = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  createCategory(category: CategoryDto): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(`${this.urlBase}/categories`, category);
  }

  getCategories(): Observable<CategoryListResponse> {
    return this.http.get<CategoryListResponse>(`${this.urlBase}/categories`);
  }

  getCategory(id: number): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.urlBase}/categories/${id}`);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/categories/${id}`);
  }

  editCategory(id: number, editCategory: CategoryDto): Observable<CategoryResponse> {
    return this.http.put<CategoryResponse>(`${this.urlBase}/categories/${id}`, editCategory);
  }

}
