import { Component, OnInit } from "@angular/core";
import { ArticleService } from "../article.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-my-articles",
  templateUrl: "./my-articles.component.html",
  styleUrls: ["./my-articles.component.css"]
})
export class MyArticlesComponent implements OnInit {
  constructor(
    private article: ArticleService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}

  isAuthenticated: boolean;
  isCurrentUser: string;
  authorName: string;
  comment: string;
  slug: string;
  comments: string[];
  createdComment: string;
  commentorname: string;
  favoritesCount: number;
  authorFollowing: boolean;
  favorited: boolean;
  isFollowing: boolean;

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get("id");
    this.createdfeed(this.route.snapshot.paramMap.get("id"));
    this.auth.isAuthenticated.subscribe(data => (this.isAuthenticated = data));
    this.auth.currentUser.subscribe(data => {
      this.isCurrentUser = data.username;
    });
    this.showcomments(this.slug);
  }

  ngOnChanges() {
    this.showcomments(this.slug);
  }

  createdArticle: string[];

  createdfeed(id: string) {
    this.article.justCreatedArticle(id).subscribe((data: any) => {
      this.createdArticle = data as string[];
      this.favoritesCount = data.article.favoritesCount;
      this.favorited = data.article.favorited;
      console.log(this.favorited);
      this.slug = data.article.slug;
      console.log(this.slug);
      this.authorName = data.article.author.username;
      this.auth.authordetail(this.authorName).subscribe((data: any) => {
        this.isFollowing = data.profile.following;
      });
    });
  }

  showcomments(id: string) {
    this.article.showcomments(id).subscribe((data: any) => {
      this.comments = data.comments as string[];
    });
  }

  updateArticle(slug: string) {
    this.router.navigate(["/updateArticle/" + slug]);
  }

  deletearticle(slug: string) {
    this.article.deletearticle(slug).subscribe(
      () => {},
      () => {},
      () => {
        this.router.navigate(["/detail/" + this.isCurrentUser]);
      }
    );
  }

  submit() {
    if (this.isAuthenticated) {
      this.article
        .addcomment(this.comment, this.slug)
        .subscribe((data: any) => {
          this.createdComment = data.comment as string;
          console.log(this.createdComment);
          this.comments.unshift(this.createdComment);
          console.log(this.comments);
          this.comment = "";
        });
    } else {
      this.router.navigate(["/signup"]);
    }
  }

  deletecomment(commentid: string, com: any) {
    console.log(this.comments);
    this.article
      .deletecomment(this.slug, commentid)
      .subscribe(data => console.log(data));
    const index = this.comments.indexOf(com);
    this.comments.splice(index, 1);
    console.log(this.comments);
  }

  followUser(authorUserName: string) {
    if (this.isAuthenticated) {
      this.auth.followUser(authorUserName).subscribe((data: any) => {
        {
          this.isFollowing = data.profile.following;
          console.log(this.isFollowing);
        }
      });
    } else {
      this.router.navigate(["/signup"]);
    }
  }

  unfollowUser(author: string) {
    if (this.isAuthenticated) {
      this.auth.unfollowUser(author).subscribe((data: any) => {
        this.isFollowing = data.profile.following;
        console.log(this.isFollowing);
      });
    } else {
      this.router.navigate(["/signup"]);
    }
  }

  likeArticle(slug: string) {
    if (this.isAuthenticated) {
      this.article.likeArticle(slug).subscribe((data: any) => {
        this.favorited = data.article.favorited;
      });

      this.favoritesCount++;
    } else {
      this.router.navigate(["/signup"]);
    }
  }

  unlikeArticle(slug: string) {
    if (this.isAuthenticated) {
      this.article.unlikeArticle(slug).subscribe((data: any) => {
        this.favorited = data.article.favorited;
      });
      this.favoritesCount--;
    } else {
      this.router.navigate(["/signup"]);
    }
  }
}
