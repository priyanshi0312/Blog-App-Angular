import { Component, OnInit, Input } from "@angular/core";
import { Feed } from "../models/feed.model";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { ArticleService } from "../article.service";

@Component({
  selector: "app-feed",
  templateUrl: "./feed.component.html",
  styleUrls: ["./feed.component.css"]
})
export class FeedComponent implements OnInit {
  @Input()
  feed: any;
  author: string;
  createdAt: string;
  slug: string;
  description: string;
  title: string;
  isAuthenticated: boolean;
  isUsername: string;
  favoritesCount: number;
  favorited: boolean;
  image: string;

  constructor(
    private auth: AuthService,
    private article: ArticleService,
    private router: Router
  ) {}

  ngOnInit(feed = this.feed) {
    this.author = feed.author.username;
    this.image = feed.author.image;
    this.createdAt = feed.createdAt;
    this.slug = feed.slug;
    this.description = feed.description;
    this.title = feed.title;
    this.favoritesCount = feed.favoritesCount;
    this.auth.isAuthenticated.subscribe(data => (this.isAuthenticated = data));
    this.auth.currentUser.subscribe(data => {
      this.isUsername = data.username;
    });
    this.favorited = feed.favorited;
    console.log(this.favorited);
  }

  likeArticle(slug: string) {
    if (this.isAuthenticated) {
      if (this.isUsername != this.author) {
        this.article.likeArticle(slug).subscribe((data: any) => {
          this.favorited = data.article.favorited;
          console.log(this.favorited);
        });

        this.favoritesCount++;
      }
    } else {
      this.router.navigate(["/signup"]);
    }
  }

  unlikeArticle(slug: string) {
    if (this.isAuthenticated) {
      this.article.unlikeArticle(slug).subscribe((data: any) => {
        this.favorited = data.article.favorited;
        console.log(this.favorited);
      });
      this.favoritesCount--;
    } else {
      this.router.navigate(["/signup"]);
    }
  }
}
