import { Component } from '@angular/core';
import { ButtonComponent } from '../common/button/button.component';
import { InputComponent } from '../common/input/input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, InputComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {

}
