import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { JwtServicesService } from "../jwt-services.service";
import { ArticleService } from "../article.service";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-favourite-articles",
  templateUrl: "./my-favourite-articles.component.html",
  styleUrls: ["./my-favourite-articles.component.css"]
})
export class MyFavouriteArticlesComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private jwt: JwtServicesService,
    private auth: AuthService,
    private router: Router
  ) {}

  myFavourite: string[];
  isAuthenticated: boolean;
  authorName: string;
  authorFollowing: boolean;
  image: string;
  isFavourited: boolean;

  ngOnInit() {
    this.getFavouriteArticles();
    this.authorprofile();
    this.auth.isAuthenticated.subscribe(data => (this.isAuthenticated = data));
  }

  getFavouriteArticles() {
    if (this.jwt.getToken()) {
      const header = {
        headers: { Authorization: "Token " + this.jwt.getToken() }
      };
      this.route.paramMap.subscribe(params => {
        this.http
          .get(
            "https://conduit.productionready.io/api/articles?favorited=" +
              params.get("id"),
            header
          )
          .subscribe((data: any) => {
            this.myFavourite = data.articles as string[];
            console.log(this.myFavourite);
            this.route.params.subscribe(params => {
              this.authorName = params["id"]; // (+) converts string 'id'
              // console.log(this.authorName);
            });
          });
      });
    } else {
      this.route.paramMap.subscribe(params => {
        this.http
          .get(
            "https://conduit.productionready.io/api/articles?favorited=" +
              params.get("id")
          )
          .subscribe((data: any) => {
            this.myFavourite = data.articles as string[];
            console.log(this.myFavourite);
            this.route.params.subscribe(params => {
              this.authorName = params["id"]; // (+) converts string 'id'
              // console.log(this.authorName);
            });
          });
      });
    }
  }

  authorprofile() {
    if (this.jwt.getToken()) {
      const header = {
        headers: { Authorization: "Token " + this.jwt.getToken() }
      };
      this.route.paramMap.subscribe(params => {
        this.http
          .get(
            "https://conduit.productionready.io/api/profiles/" +
              params.get("id"),
            header
          )
          .subscribe((data: any) => {
            console.log(data.profile.following);
            this.authorFollowing = data.profile.following;
            this.image = data.profile.image;
          });
      });
    } else {
      this.router.navigate(["/signup"]);
    }
  }

  followUser(authorUserName: string) {
    if (this.isAuthenticated) {
      this.auth.followUser(authorUserName).subscribe((data: any) => {
        {
          this.authorFollowing = data.profile.following;
          console.log(this.authorFollowing);
        }
      });
    } else {
      this.router.navigate(["/signup"]);
    }
  }

  unfollowuser(authorUserName: string) {
    this.auth.unfollowUser(authorUserName).subscribe((data: any) => {
      this.authorFollowing = data.profile.following;
    });
  }
}
