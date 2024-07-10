import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TodoComponent} from "./features/todo/todo.component";
import {AboutComponent} from "./features/about/about.component";
import {HomeComponent} from "./features/home/home.component";

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
    path: "about",
    loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule),
    component: AboutComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
