import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoComponent} from "./features/todo/todo.component";
import {HomeComponent} from "./features/home/home.component";
import {LoginComponent} from "./features/login/login.component";
import {RegisterComponent} from "./features/register/register.component";
import {AccountComponent} from "./features/account/account.component";
import {isUserAuthGuard} from "./core/guard/is-user-auth.guard";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule),
    component: HomeComponent,
  },
  {
    path: 'todo',
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule),
    component: TodoComponent
  },
  {
    path:"login",
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule),
    component: LoginComponent,
  },
  {
    path:"register",
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule),
    component: RegisterComponent,
  },
  {
    path:"account",
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule),
    canActivate: [isUserAuthGuard],
    component: AccountComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
