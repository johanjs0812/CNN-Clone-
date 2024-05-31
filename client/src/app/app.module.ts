import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ListnewsComponent } from './listnews/listnews.component';
import { PostsComponent } from './posts/posts.component';
import { AboutComponent} from './about/about.component';
import { LoginComponent} from './login/login.component';
import { SignupComponent} from './signup/signup.component';
import { CommentComponent } from './comment/comment.component';
import { RightbarComponent } from './rightbar/rightbar.component';

import { AdminModule } from './admin.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ListnewsComponent,
    PostsComponent,
    AboutComponent,
    LoginComponent,
    SignupComponent,
    CommentComponent,
    RightbarComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AdminModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
