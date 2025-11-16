import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  newUser = {
    name: '',
    email: '',
    role: 'Usuario',
    phone: '',
    active: true
  };

  createUser() {
    if (this.newUser.name.trim() && this.newUser.email.trim()) {
      console.log('Nuevo usuario creado:', this.newUser);
      // Aquí puedes agregar la lógica para guardar el usuario
      // Por ejemplo, llamar a un servicio

      // Cerrar el modal
      const modalElement = document.getElementById('newUserModal');
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
    this.newUser = {
      name: '',
      email: '',
      role: 'Usuario',
      phone: '',
      active: true
    };
  }
}
