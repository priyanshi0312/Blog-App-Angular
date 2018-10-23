import { Injectable } from "@angular/core";
import { User } from "../app/models/user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Headers } from "@angular/http";
import { Observable, BehaviorSubject, ReplaySubject } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";
import { JwtServicesService } from "../app/jwt-services.service";
import { ArticleService } from "../app/article.service";

var httpOptions = new Headers();
httpOptions.append("content-type", "json");

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private jwtService: JwtServicesService,
    private article: ArticleService
  ) {}

  token: string;

  header = {
    headers: {
      Authorization: "Token " + this.jwtService.getToken()
    }
  };

  login(userId: string, password: string) {
    console.log(userId);
    console.log(password);

    const object = {
      user: {
        email: userId,
        password: password
      }
    };
    console.log(object);
    return this.http.post(
      "https://conduit.productionready.io/api/users/login",
      object
    );
  }

  signIn(userName: string, email: string, password: string) {
    const SignInUser = {
      user: {
        username: userName,
        email: email,
        password: password
      }
    };
    console.log(SignInUser);

    return this.http
      .post("https://conduit.productionready.io/api/users", SignInUser)
      .subscribe(user => console.log(user));
  }

  setAuth(user: User) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    //console.log(user);

    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  yourFeed() {
    const SignInUser = { user: {} };
    console.log(SignInUser);

    return this.http.post(
      "https://conduit.productionready.io/api/users",
      SignInUser
    );
  }

  changeSettings(editUser: any) {
    console.log(editUser);
    return this.http.put(
      "https://conduit.productionready.io/api/user",
      editUser,
      { headers: { Authorization: "Token " + this.jwtService.getToken() } }
    );
  }

  getUser() {
    return this.http.get("https://conduit.productionready.io/api/user", {
      headers: { Authorization: "Token " + this.jwtService.getToken() }
    });
  }

  populate() {
    if (this.jwtService.getToken()) {
      this.getUser().subscribe(
        (data: any) => this.setAuth(data.user),
        err => this.purgeAuth()
      );
    } else {
      this.purgeAuth();
    }
  }

  followUser(followUserName: string) {
    // console.log(this.jwtService.getToken());
    // console.log(followUserName);
    // console.log(this.header);

    return this.http.post(
      "https://conduit.productionready.io//api/profiles/" +
        followUserName +
        "/follow",
      {},
      this.header
    );
  }

  unfollowUser(followUserName: string) {
    return this.http.delete(
      "https://conduit.productionready.io//api/profiles/" +
        followUserName +
        "/follow",
      this.header
    );
  }

  authordetail(authorName: string) {
    if (this.jwtService.getToken()) {
      return this.http.get(
        "https://conduit.productionready.io//api/profiles/" + authorName,
        this.header
      );
    } else {
      return this.http.get(
        "https://conduit.productionready.io//api/profiles/" + authorName
      );
    }
  }
}
