import { Injectable } from "@angular/core";
import { JwtServicesService } from "../app/jwt-services.service";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private jwt: JwtServicesService, private route: Router) {}

  canActivate() {
    if (this.jwt.getToken()) {
      return true;
    }
    this.route.navigate["/home/globalfeed"];
    return false;
  }
}
