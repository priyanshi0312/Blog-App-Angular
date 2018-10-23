import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { JwtServicesService } from "../app/jwt-services.service";
import { User } from "../app/models/user.model";
import { map } from "../../node_modules/rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ArticleService {
  constructor(private http: HttpClient, private jwt: JwtServicesService) {}

  newArticle(newArticle: any) {
    return this.http.post(
      "https://conduit.productionready.io/api/articles",
      newArticle,
      { headers: { Authorization: "Token " + this.jwt.getToken() } }
    );
  }

  getTagfeed(tag: string) {
    if (this.jwt.getToken()) {
      return this.http.get(
        "https://conduit.productionready.io/api/articles?tag=" + tag,
        {
          headers: { Authorization: "Token " + this.jwt.getToken() }
        }
      );
    }
    return this.http.get(
      "https://conduit.productionready.io/api/articles?tag=" + tag
    );
  }

  justCreatedArticle(id: string) {
    console.log(id);
    return this.http.get(
      "https://conduit.productionready.io/api/articles/" + id
    );
  }

  getArticle(id: string) {
    // console.log(id);
    return this.http.get(
      "https://conduit.productionready.io/api/articles/" + id
    );
  }

  updateArticle(article: any, slug: string) {
    return this.http.put(
      "https://conduit.productionready.io/api/articles/" + slug,
      article,
      {
        headers: { Authorization: "Token " + this.jwt.getToken() }
      }
    );
  }

  deletearticle(slug: string) {
    console.log("reached");
    console.log(slug);

    return this.http
      .delete("https://conduit.productionready.io/api/articles/" + slug, {
        headers: { Authorization: "Token " + this.jwt.getToken() }
      })
      .pipe(map(request => console.log(request)));

    console.log("hii");
  }

  addcomment(comment: string, slug: string) {
    const createdcomment = {
      comment: {
        body: comment
      }
    };
    return this.http.post(
      "https://conduit.productionready.io/api/articles/" + slug + "/comments",
      createdcomment,
      {
        headers: { Authorization: "Token " + this.jwt.getToken() }
      }
    );
  }

  showcomments(slug: string) {
    if (this.jwt.getToken()) {
      return this.http.get(
        "https://conduit.productionready.io/api/articles/" + slug + "/comments",
        {
          headers: { Authorization: "Token " + this.jwt.getToken() }
        }
      );
    } else {
      return this.http.get(
        "https://conduit.productionready.io/api/articles/" + slug + "/comments"
      );
    }
  }

  deletecomment(slug: string, commentid: string) {
    return this.http.delete(
      "https://conduit.productionready.io/api/articles/" +
        slug +
        "/comments/" +
        commentid,
      {
        headers: { Authorization: "Token " + this.jwt.getToken() }
      }
    );
  }

  likeArticle(slug: string) {
    return this.http.post(
      "https://conduit.productionready.io/api/articles/" + slug + "/favorite",
      {},
      {
        headers: { Authorization: "Token " + this.jwt.getToken() }
      }
    );
  }

  unlikeArticle(slug: string) {
    console.log(slug);

    return this.http.delete(
      "https://conduit.productionready.io/api/articles/" + slug + "/favorite",
      {
        headers: { Authorization: "Token " + this.jwt.getToken() }
      }
    );
  }

  getTags() {
    return this.http.get("https://conduit.productionready.io/api/tags");
  }
}
