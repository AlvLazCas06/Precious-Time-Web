import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sidebar } from "../../../../layouts/admin-layout-component/sidebar/sidebar";
import { CategoryService } from '../../../../services/category.service';
import { CategoryDto } from '../../../../models/dto/category.dto';
import { CategoryResponse } from '../../../../models/interfaces/category-response.interface';

@Component({
  selector: 'app-category-list-page',
  imports: [CommonModule, Sidebar, RouterLink, ReactiveFormsModule],
  templateUrl: './category-list-page.html',
  styleUrl: './category-list-page.css',
})
export class CategoryListPage implements OnInit {

  categories: CategoryResponse[] = [];
  newCategoryForm = new FormGroup({
    nameFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(255)
    ]),
    emojiFormControl: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2)
    ]),
    colorFormControl: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(resp => {
      this.categories = resp;
    })
  }

  createCategory() {
    const newCategory = new CategoryDto(
      this.newCategoryForm.get('nameFormControl')?.value!,
      this.newCategoryForm.get('emojiFormControl')?.value!,
      this.newCategoryForm.get('colorFormControl')?.value!
    );
    this.categoryService.createCategory(newCategory).subscribe(resp => {
      window.location.reload();
    });
  }

  removeCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(resp => {
      window.location.reload();
    });
  }

}
