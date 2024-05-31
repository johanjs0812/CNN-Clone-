import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListnewsComponent } from './listnews/listnews.component';
import { PostsComponent } from './posts/posts.component';
import { AboutComponent} from './about/about.component';
import { LoginComponent} from './login/login.component';
import { SignupComponent} from './signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'listnews/:id', component: ListnewsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'post/:id', component: PostsComponent },
  { path: 'admin', loadChildren: () => import('./admin.module').then(m => m.AdminModule) }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
