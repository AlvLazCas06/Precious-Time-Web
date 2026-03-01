import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../layouts/admin-layout-component/sidebar/sidebar';
import { CategoryResponse } from '../../models/interfaces/category-response.interface';
import { CategoryService } from '../../services/category.service';
import { PreferenceService } from '../../services/preference.service';
import { PreferenceResponse } from '../../models/interfaces/preference-response.interface';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoryDto } from '../../models/dto/category.dto';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Sidebar],
  templateUrl: './category-page.html',
  styleUrl: './category-page.css',
})
export class CategoryPage implements OnInit {

  nextPage?: string
  currentPageNumber = 1;
  pagesNumber = 1;
  editCategoryId?: number;
  openModal = false
  loading: boolean = true
  categories: CategoryResponse[] = [];
  preference?: PreferenceResponse;
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
    ]),
  });

  editCategoryForm = new FormGroup({
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

  constructor(
    private categoryService: CategoryService,
    private preferenceService: PreferenceService
  ) { }

  get isDarkTheme(): boolean {
    return this.preference?.theme === 'dark';
  }

  colors: string[] = [
    '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#f59e0b', '#ec4899',
    '#14b8a6', '#f97316', '#6366f1', '#06b6d4', '#84cc16', '#a855f7'
  ];

  emojis: string[] = [
    '📁', '💼', '🏠', '📚', '❤️', '💰', '🎮', '🛒',
    '👨‍👩‍👧‍👦', '🎨', '🏋️', '🍔', '✈️', '📱', '🎵', '⭐'
  ];

  isEditing: boolean = false;

  openNewCategoryModal() {
    this.isEditing = false;

  }

  ngOnInit(): void {
    this.categoryService.getCategories(this.currentPageNumber).subscribe({
      next: resp => {
        this.categories = resp.content;
        this.pagesNumber = resp.page.totalPages;
        this.currentPageNumber = resp.page.number;
        this.loading = false
      }
    });
    this.preferenceService.getPreference().subscribe({
      next: resp => {
        this.preference = resp;
      }
    })
  }

  createCategory() {
    const category = new CategoryDto(
      this.newCategoryForm.get('nameFormControl')?.value!,
      this.newCategoryForm.get('emojiFormControl')?.value!,
      this.newCategoryForm.get('colorFormControl')?.value!,
    );
    this.categoryService.createCategory(category).subscribe({
      next: resp => window.location.reload(),
      error: errors => alert('error al crear la categoria')
    });
  }

  removeCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe({
      next: resp => window.location.reload(),
      error: errors => alert('Error al eliminar la categoria')
    });
  }

  editCategoryModal(id: number) {
    this.categoryService.getCategory(id).subscribe({
      next: resp => {
        this.editCategoryId = resp.id
        this.editCategoryForm.patchValue({
          nameFormControl: resp.name,
          emojiFormControl: resp.emoji,
          colorFormControl: resp.color
        });
        this.openModal = true;
      }
    });
  }

  closeModal() {
    this.openModal = false;
  }

  modifyCategory() {
    const editCategory = new CategoryDto(
      this.editCategoryForm.get('nameFormControl')?.value!,
      this.editCategoryForm.get('emojiFormControl')?.value!,
      this.editCategoryForm.get('colorFormControl')?.value!,
    );
    this.categoryService.editCategory(this.editCategoryId!, editCategory).subscribe({
      next: resp => {
        this.openModal = false;
        window.location.reload();
      },
      error: errors => alert('error al editar la categoria')
    });
  }

  changePage(number: number) {
    this.categoryService.getCategories(number).subscribe({
      next: resp => {
        this.categories = resp.content;
        this.currentPageNumber = resp.page.number;
        this.loading = false
        window.location.reload;
      }
    });
  }

}
