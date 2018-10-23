import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { YourFeedComponent } from "../your-feed/your-feed.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  isAuthenticate: boolean;
  currentUser: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.isAuthenticated.subscribe(data => {
      this.isAuthenticate = data;
    });
    this.auth.currentUser.subscribe(data => {
      this.currentUser = data.username;
    });
  }
}
