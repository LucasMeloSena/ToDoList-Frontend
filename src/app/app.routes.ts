import { Routes } from "@angular/router";
import { AuthPageComponent } from "./pages/auth-page/auth-page.component";
import { AppPageComponent } from "./pages/app-page/app-page.component";
import { authGuard } from "./guards/auth-guard.guard";

export const routes: Routes = [
  {
    path: "login",
    component: AuthPageComponent,
    title: "Entre | ToDo List",
  },
  {
    path: "app",
    component: AppPageComponent,
    canActivate: [authGuard],
    title: "Home | ToDo List",
  },
  {
    path: "**",
    redirectTo: "login",
  },
];
