import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { LoginService } from "../services/auth/login.service";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router);
  const auth = inject(LoginService);
  const isAuthenticated = auth.authenticated.value;
  const protectedRoutes = ["/app"];
  return protectedRoutes.includes(state.url) && !isAuthenticated ? router.navigate(["/login"], { replaceUrl: true }) : true;
};
