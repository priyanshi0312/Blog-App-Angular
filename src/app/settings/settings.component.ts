import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  user: string;
  usermail: string;
  bio: string;
  Url: string;

  ngOnInit() {
    this.settings();
  }

  settings() {
    this.auth.currentUser.subscribe(data => {
      this.user = data.username;
      this.usermail = data.email;
      console.log(data.username);
    });
  }

  submit() {
    const editUser = {
      user: {
        email: this.usermail,
        bio: this.bio,
        image: this.Url
      }
    };
    this.auth.changeSettings(editUser).subscribe(data => console.log(data));
    this.router.navigate(["/detail/" + this.user]);
  }

  logout() {
    this.auth.purgeAuth();
    this.router.navigate(["/"]);
  }
}
