import { Component } from '@angular/core';
import { ButtonComponent } from '../common/button/button.component';
import { InputComponent } from '../common/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { showErrorMessage } from '../../utils/show-error-message';
import { LoginService } from '../../services/auth/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private toast: ToastrService, private loginService: LoginService, private router: Router) {}

  form: FormGroup = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    })
  })

  async onSubmit() {
    if (!this.form.valid) {
      const errorMessage = showErrorMessage(this.form)
      this.toast.warning(errorMessage)
      return
    }
    try {
      await this.loginService.login(this.form.value)
      this.router.navigate(['/app'], {
        replaceUrl: true
      })
    } catch (_) {
      this.toast.error("Credenciais inválidas!")
    }
  }
}
