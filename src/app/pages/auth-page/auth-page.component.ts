import { Component, computed, inject, signal } from "@angular/core";
import { LucideAngularModule, Check } from "lucide-angular";
import { LoginComponent } from "../../components/login/login.component";
import { ButtonComponent } from "../../components/common/button/button.component";
import { RegisterComponent } from "../../components/register/register.component";
import { RegisterService } from "../../services/auth/register.service";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [LucideAngularModule, LoginComponent, RegisterComponent, ButtonComponent],
  templateUrl: "./auth-page.component.html",
})
export class AuthPageComponent {
  readonly Check = Check;
  page = inject(RegisterService);

  today = new Date().getFullYear();
  headerButtonText = signal("Cadastro");
  isLoginCurrentPage = computed(() => this.page.isLoginPage());

  toogleAuthPage() {
    const currentPage = this.page.isLoginPage();
    this.page.updateCurrentPage(!currentPage);
    this.headerButtonText.set(currentPage ? "Cadastro" : "Login");
  }
}
