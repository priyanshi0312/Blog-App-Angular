import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ArticleService } from "../article.service";

@Component({
  selector: "app-tags",
  templateUrl: "./tags.component.html",
  styleUrls: ["./tags.component.css"]
})
export class TagsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private article: ArticleService
  ) {}

  tag: any;
  tagFeeds: string[];

  ngOnInit() {
    this.getTagFeed();
  }

  ngOnChanges() {
    this.getTagFeed();
  }

  ngDoCheck() {}

  getTagFeed() {
    this.route.paramMap.subscribe(params => {
      return this.article
        .getTagfeed(params.get("id"))
        .subscribe((data: any) => {
          this.tagFeeds = data.articles as string[];
          this.tag = params.get("id");
        });
    });
  }

  // getTagFeed() {
  //   this.tag = this.route.snapshot.paramMap.get("id");
  //   console.log(this.tag);
  //   return this.article.getTagfeed(this.tag).subscribe(data => {
  //     console.log(data);
  //     this.tagFeeds = data as string[];
  //   });
  // }
}
