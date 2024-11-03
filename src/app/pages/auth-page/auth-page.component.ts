import { Component, signal } from '@angular/core';
import { LucideAngularModule, Check } from 'lucide-angular';
import { LoginComponent } from '../../components/login/login.component';
import { ButtonComponent } from '../../components/common/button/button.component';
import { RegisterComponent } from '../../components/register/register.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [LucideAngularModule, LoginComponent, RegisterComponent, ButtonComponent],
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent {
  readonly Check = Check;

  today = new Date().getFullYear()
  headerButtonText = signal('Cadastro')
  isLoginCurrentPage = signal(true)

  toogleAuthPage() {
    this.isLoginCurrentPage.set(!this.isLoginCurrentPage())
    this.headerButtonText.set(this.isLoginCurrentPage() ? 'Cadastro' : 'Login')
  }
}
