import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { UserList } from './pages/user-list/user-list';
import { AnalysisPage } from './pages/analysis-page/analysis-page';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { Sidebar } from './layouts/admin-layout-component/sidebar/sidebar';
import { CategoryListPage } from './pages/configurations/category/category-list-page/category-list-page';
import { NotificationPage } from './pages/configurations/notification-page/notification-page';
import { SystemConfigPage } from './pages/configurations/system-config-page/system-config-page';
import { SecurityConfigPage } from './pages/configurations/security-config-page/security-config-page';
import { SignUpPage } from './pages/sign-up-page/sign-up-page';

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
    },
    {
        path: 'config/category',
        component: CategoryListPage
    },
    {
        path: 'config/notification',
        component: NotificationPage
    },
    {
        path: 'config/system',
        component: SystemConfigPage
    },
    {
        path: 'config/security',
        component: SecurityConfigPage
    }
];
