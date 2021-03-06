import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  isAuthenticate: boolean;
  user: string;

  ngOnInit() {
    this.auth.isAuthenticated.subscribe(data => {
      this.isAuthenticate = data;
    });

    this.auth.currentUser.subscribe(data => {
      this.user = data.username;
    });
  }
}
