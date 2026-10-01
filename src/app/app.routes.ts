import { Routes } from '@angular/router';
import { Homepage } from './features/homepage/homepage.component';
import { Login } from './features/login/login.component';
import { Register } from './features/register/register.component';
import { Profile } from './features/profile/profile.component';

export const routes: Routes = [
    // home page 
    { path: '', component: Homepage },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'profile/:id', component: Profile }, // Assuming you want to navigate to the homepage for the profile route
    { path: '**', redirectTo: '' } // Redirect any unknown paths to the homepage
];
