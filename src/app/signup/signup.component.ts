import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { User } from "../models/user.model";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  userName: string;
  email: string;
  password: string;

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  public submit() {
    this.auth.signIn(this.userName, this.email, this.password);
  }
}
