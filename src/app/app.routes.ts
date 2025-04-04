import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AddComponent } from './pages/add/add.component';
import { ListComponent } from './pages/list/list.component';
import { DetallesComponent } from './pages/detalles/detalles.component';
import { ErrorComponent } from './pages/error/error.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'add', component: AddComponent},
    {path: 'list', component: ListComponent},
    {path: 'details', component: DetallesComponent},
    {path: 'details/:id', component: DetallesComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', component: ErrorComponent, pathMatch: 'full'}
];
