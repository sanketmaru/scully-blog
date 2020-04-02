import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogDashboardComponent } from './blog-dashboard/blog-dashboard.component';

const routes: Routes = [
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
  { path: '', component:  BlogDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
