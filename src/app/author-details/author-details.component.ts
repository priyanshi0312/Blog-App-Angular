import { Component, OnInit, OnChanges } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { JwtServicesService } from "../jwt-services.service";
import { ArticleService } from "../article.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-author-details",
  templateUrl: "./author-details.component.html",
  styleUrls: ["./author-details.component.css"]
})
export class AuthorDetailsComponent implements OnInit, OnChanges {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthService,
    private jwt: JwtServicesService,
    private router: Router
  ) {}
  author_details: string[];
  authorUserName: string;
  isAutenticted: boolean;
  isCurrentUser: string;
  author: string;
  authorFollowing: boolean;

  ngOnInit() {
    this.getAuthorArticles();
    this.auth.isAuthenticated.subscribe(data => (this.isAutenticted = data));
    this.auth.currentUser.subscribe(
      data => (this.isCurrentUser = data.username)
    );

    this.authorprofile();
    // console.log(this.authorFollowing);
  }

  reload() {
    this.getAuthorArticles();
  }

  ngOnChanges() {
    this.getAuthorArticles();
    this.auth.isAuthenticated.subscribe(data => (this.isAutenticted = data));
    this.auth.currentUser.subscribe(
      data => (this.isCurrentUser = data.username)
    );
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
            this.authorFollowing = data.profile.following;
          });
      });
    } else {
      this.route.paramMap.subscribe(params => {
        this.http
          .get(
            "https://conduit.productionready.io/api/profiles/" +
              params.get("id")
          )
          .subscribe((data: any) => {
            console.log(data.profile.following);
            this.authorFollowing = data.profile.following;
            // console.log(this.authorFollowing);
          });
      });
    }
  }

  getAuthorArticles() {
    if (this.jwt.getToken()) {
      const header = {
        headers: { Authorization: "Token " + this.jwt.getToken() }
      };
      this.route.paramMap.subscribe(params => {
        this.http
          .get(
            "https://conduit.productionready.io/api/articles?author=" +
              params.get("id"),
            header
          )
          .subscribe((data: any) => {
            this.author_details = data.articles as string[];
            // console.log("author details");
            this.authorUserName = (this
              .author_details[0] as any).author.username;
            // console.log(this.author_details);
          });
      });
    } else {
      this.route.paramMap.subscribe(params => {
        this.http
          .get(
            "https://conduit.productionready.io/api/articles?author=" +
              params.get("id")
          )
          .subscribe((data: any) => {
            this.author_details = data.articles as string[];
            // console.log("author details");
            this.authorUserName = (this
              .author_details[0] as any).author.username;
            // console.log(this.author_details);
          });
      });
    }
  }

  followUser(authorUserName: string) {
    console.log(authorUserName);
    if (this.isAutenticted) {
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
