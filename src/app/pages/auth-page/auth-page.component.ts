import { Component } from '@angular/core';
import { LucideAngularModule, Check } from 'lucide-angular';
import { LoginComponent } from '../../components/login/login.component';
import { ButtonComponent } from '../../components/common/button/button.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [LucideAngularModule, LoginComponent, ButtonComponent],
  templateUrl: './auth-page.component.html',
})
export class AuthPageComponent {
  readonly Check = Check;
  today = new Date().getFullYear()
}
