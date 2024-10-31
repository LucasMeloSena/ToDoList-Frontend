import { Component } from '@angular/core';
import { LucideAngularModule, Check } from 'lucide-angular';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [LucideAngularModule, LoginComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  readonly Check = Check;
  today = new Date().getFullYear()
}
