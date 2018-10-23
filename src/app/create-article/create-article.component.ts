import { Component, OnInit } from "@angular/core";
import { ArticleService } from "../article.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-article",
  templateUrl: "./create-article.component.html",
  styleUrls: ["./create-article.component.css"]
})
export class CreateArticleComponent implements OnInit {
  constructor(
    private article: ArticleService,
    private http: HttpClient,
    private router: Router
  ) {}

  public title: string;
  public about: string;
  public description: string;
  public tags: string;
  public tagList = [];

  ngOnInit() {}

  createdArticle: string[];

  submit() {
    const newArticle = {
      article: {
        title: this.title,
        description: this.about,
        body: this.description,
        tagList: [this.tagList]
      }
    };

    console.log(newArticle);
    this.article.newArticle(newArticle).subscribe((data: any) => {
      this.router.navigate(["/article/" + data.article.slug]);
    });
  }

  addTags() {
    if (this.tags) this.tagList.push(this.tags);
    this.tags = "";
  }

  removeTag(tag: string) {
    console.log("hii");

    const index = this.tagList.indexOf(tag);
    this.tagList.splice(index, 1);
  }
}
