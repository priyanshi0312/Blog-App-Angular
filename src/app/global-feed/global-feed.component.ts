import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Feed } from "../models/feed.model";
import { JwtServicesService } from "../jwt-services.service";
import { ArticleService } from "../article.service";

@Component({
  selector: "app-global-feed",
  templateUrl: "./global-feed.component.html",
  styleUrls: ["./global-feed.component.css"]
})
export class GlobalFeedComponent implements OnInit {
  global_feed: string[];
  global: string[];

  constructor(
    private http: HttpClient,
    private jwtService: JwtServicesService,
    private article: ArticleService
  ) {}

  ngOnInit() {
    if (this.jwtService.getToken()) {
      const header = {
        headers: {
          Authorization: "Token " + this.jwtService.getToken()
        }
      };
      this.http
        .get("https://conduit.productionready.io/api/articles", header)
        .subscribe((data: any) => {
          this.global_feed = data.articles;
          console.log(this.global_feed);
        });
    } else {
      this.http
        .get("https://conduit.productionready.io/api/articles")
        .subscribe((data: any) => {
          this.global_feed = data.articles;
        });
    }
  }

  ngOnChanges() {
    const header = {
      headers: { Authorization: "Token " + this.jwtService.getToken() }
    };
    this.http
      .get("https://conduit.productionready.io/api/articles", header)
      .subscribe(data => {
        this.global_feed = data as string[];
        console.log(this.global_feed);
      });
  }
}
