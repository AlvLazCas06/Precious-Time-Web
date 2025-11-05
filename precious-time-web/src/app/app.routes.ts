import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { UserList } from './pages/user-list/user-list';

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
        path: 'users',
        component: UserList
    }
];
