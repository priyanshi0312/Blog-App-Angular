import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { ArticleService } from "../article.service";

@Component({
  selector: "app-updat-article",
  templateUrl: "./updat-article.component.html",
  styleUrls: ["./updat-article.component.css"]
})
export class UpdatArticleComponent implements OnInit {
  constructor(
    private article: ArticleService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  articledata: any;
  title: string;
  about: string;
  description: string;
  public tags: string;
  public tagList = [];
  slug: string;

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get("id");
    this.getArticle(this.route.snapshot.paramMap.get("id"));
  }

  getArticle(id: string) {
    this.article.getArticle(id).subscribe((data: any) => {
      this.articledata = data.article as string[];
      this.title = this.articledata.title;
      this.about = this.articledata.description;
      this.description = this.articledata.body;
      console.log(this.articledata);
    });
  }

  addTags() {
    if (this.tags) this.tagList.push(this.tags);
    this.tags = "";
    console.log(this.tagList);
  }

  submit() {
    const updatearticle = {
      article: {
        title: this.title,
        description: this.about,
        body: this.description
      }
    };
    this.article
      .updateArticle(updatearticle, this.slug)
      .subscribe(data => console.log(data));
    this.router.navigate(["article/" + this.slug]);
  }

  removeTag(tag: string) {
    const index = this.tagList.indexOf(tag);
    this.tagList.splice(index, 1);
  }
}
