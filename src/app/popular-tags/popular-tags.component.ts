import { Component, OnInit } from "@angular/core";
import { ArticleService } from "../article.service";

@Component({
  selector: "app-popular-tags",
  templateUrl: "./popular-tags.component.html",
  styleUrls: ["./popular-tags.component.css"]
})
export class PopularTagsComponent implements OnInit {
  tags = [];
  constructor(private article: ArticleService) {}

  ngOnInit() {
    this.fetchTags();
  }

  fetchTags() {
    this.article.getTags().subscribe((data: any) => {
      this.tags = data.tags;
    });
  }
}
