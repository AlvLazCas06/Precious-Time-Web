import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { UserList } from './pages/user-list/user-list';
import { AnalysisPage } from './pages/analysis-page/analysis-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { Sidebar } from './layouts/admin-layout-component/sidebar/sidebar';

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
    },
    {
        path: 'analisys',
        component: AnalysisPage
    },
    {
        path: 'dashboard',
        component: DashboardPage
    },
    {
        path: 'side',
        component: Sidebar
    }
];
