import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public userId: string;
  public password: string;
  public error: string;
  public isAuthenticated: boolean;
  public user: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  public submit() {
    console.log(this.userId);
    console.log(this.password);

    this.auth.login(this.userId, this.password).subscribe((user: any) => {
      this.auth.setAuth(user.user);
      console.log(user.user);
      this.auth.isAuthenticated.subscribe(data => {
        this.isAuthenticated = data;
        console.log(data);
      });
      this.auth.currentUser.subscribe(data => {
        this.user = data.username;
      });
    });
    this.router.navigate(["/"]);
  }
}
