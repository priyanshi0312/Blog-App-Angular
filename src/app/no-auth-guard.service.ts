import { Injectable } from "@angular/core";
import { JwtServicesService } from "../app/jwt-services.service";
import { CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class NoAuthGuardService implements CanActivate {
  constructor(private jwt: JwtServicesService, private route: Router) {}
  canActivate() {
    if (this.jwt.getToken == undefined) {
      return true;
    }
    return false;
  }
}
