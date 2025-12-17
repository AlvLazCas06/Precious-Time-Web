import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Sidebar } from "../../../../layouts/admin-layout-component/sidebar/sidebar";

@Component({
  selector: 'app-category-list-page',
  imports: [RouterLink, FormsModule, CommonModule, Sidebar],
  templateUrl: './category-list-page.html',
  styleUrl: './category-list-page.css',
})
export class CategoryListPage {
  newCategory = {
    name: '',
    color: 'primary',
    icon: ''
  };

  selectColor(color: string) {
    this.newCategory.color = color;
  }

  createCategory() {
    if (this.newCategory.name.trim()) {
      console.log('Nueva categoría creada:', this.newCategory);
      // Aquí puedes agregar la lógica para guardar la categoría
      // Por ejemplo, llamar a un servicio

      // Cerrar el modal
      const modalElement = document.getElementById('newCategoryModal');
      if (modalElement) {
        const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
        if (modal) {
          modal.hide();
        }
      }

      // Resetear el formulario
      this.resetForm();
    }
  }

  resetForm() {
    this.newCategory = {
      name: '',
      color: 'primary',
      icon: ''
    };
  }
}
