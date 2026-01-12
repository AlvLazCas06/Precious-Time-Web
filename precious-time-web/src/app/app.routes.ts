import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { UserList } from './pages/user-list/user-list';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { SignUpPage } from './pages/sign-up-page/sign-up-page';
import { PreferencePage } from './pages/preference-page/preference-page';
import { NotificationsPage } from './pages/notifications-page/notifications-page';
import { CategoryPage } from './pages/category-page/category-page';
import { TaskPage } from './pages/task-page/task-page';
import { ProjectPage } from './pages/project-page/project-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'register',
    component: SignUpPage
  },
  {
    path: 'users',
    component: UserList
  },
  {
    path: 'dashboard',
    component: DashboardPage
  },
  {
    path: 'tasks',
    component: TaskPage
  },
  {
    path: 'projects',
    component: ProjectPage
  },
  {
    path: 'categories',
    component: CategoryPage
  },
  {
    path: 'notifications',
    component: NotificationsPage
  },
  {
    path: 'preference',
    component: PreferencePage
  }
];
