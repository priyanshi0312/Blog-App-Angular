import { BrowserModule } from "@angular/platform-browser";
import { NgModule, Component } from "@angular/core";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { GlobalFeedComponent } from "./global-feed/global-feed.component";
import { FeedComponent } from "./feed/feed.component";
import { Pipe } from "@angular/core";
import { pipe } from "../../node_modules/@angular/core/src/render3/pipe";
import { AuthorDetailsComponent } from "./author-details/author-details.component";
import { JwtModule } from "@auth0/angular-jwt";
import { AuthService } from "./auth.service";
import { AuthGuardService } from "./auth-guard.service";
import { NoAuthGuardService } from "./no-auth-guard.service";
import { CommentComponent } from "./comment/comment.component";
import { CreateArticleComponent } from "./create-article/create-article.component";
import { FavouriteArticlesComponent } from "./favourite-articles/favourite-articles.component";
import { MyArticlesComponent } from "./my-articles/my-articles.component";
import { MyFavouriteArticlesComponent } from "./my-favourite-articles/my-favourite-articles.component";
import { PopularTagsComponent } from "./popular-tags/popular-tags.component";
import { YourFeedComponent } from "./your-feed/your-feed.component";
import { TagsComponent } from "./tags/tags.component";
import { SettingsComponent } from "./settings/settings.component";
import { UpdatArticleComponent } from "./updat-article/updat-article.component";

const appRoutes: Routes = [
  {
    path: "signup",
    component: SignupComponent
    //canActivate: [NoAuthGuardService]
  },
  {
    path: "login",
    component: LoginComponent
    //canActivate: [NoAuthGuardService]
  },
  {
    path: "",
    redirectTo: "/home/globalfeed",
    pathMatch: "full"
  },

  {
    path: "home",
    component: HomeComponent,
    children: [
      { path: "globalfeed", component: GlobalFeedComponent },
      { path: "tags/:id", component: TagsComponent },
      { path: "myfeed", component: MyArticlesComponent }
    ]
  },

  {
    path: "setting",
    component: SettingsComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: "detail/:id",
    component: AuthorDetailsComponent
    // children: [
    //   { path: "favourite", component: MyFavouriteArticlesComponent },
    //   { path: "myfeed", component: MyArticlesComponent }
    // ]
  },

  {
    path: "createArticle",
    component: CreateArticleComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "article/:id",
    component: MyArticlesComponent
  },

  {
    path: "updateArticle/:id",
    component: UpdatArticleComponent,
    canActivate: [AuthGuardService]
  },

  {
    path: "favorite/:id",
    component: MyFavouriteArticlesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "**",
    redirectTo: "/home/globalfeed",
    pathMatch: "full"
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    GlobalFeedComponent,
    FeedComponent,
    AuthorDetailsComponent,
    CommentComponent,
    CreateArticleComponent,
    FavouriteArticlesComponent,
    MyArticlesComponent,
    MyFavouriteArticlesComponent,
    PopularTagsComponent,
    YourFeedComponent,
    TagsComponent,
    SettingsComponent,
    UpdatArticleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:4200/comment"],
        blacklistedRoutes: ["localhost:4200"]
      }
    })
  ],
  providers: [AuthService, AuthGuardService, NoAuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function tokenGetter() {
  return localStorage.getItem("access_token");
}
