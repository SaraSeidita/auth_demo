import { Routes } from '@angular/router';
import { Homepage } from './features/homepage/homepage.component';
import { Login } from './features/login/login.component';
import { Register } from './features/register/register.component';

export const routes: Routes = [
    // home page 
    { path: '', component: Homepage },
    { path: 'login', component: Login },
    { path: 'register', component: Register }
];
