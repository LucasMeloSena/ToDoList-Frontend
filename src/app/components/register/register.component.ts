import { Component } from '@angular/core';
import { InputComponent } from "../common/input/input.component";
import { ButtonComponent } from "../common/button/button.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../../services/auth/register.service';
import { Router } from '@angular/router';
import { showErrorMessage } from '../../utils/show-error-message';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(private toast: ToastrService, private registerService: RegisterService, private router: Router) {}

  form: FormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required]
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    phone: new FormControl('', {
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    }),
    confirm_password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    })
  })

  onSubmit() {
    this.form.value.phone = this.form.value.phone.replace(/\D/g, '');
    delete this.form.value.confirm_password;
    console.log(this.form.value)
    if (!this.form.valid) {
      const errorMessage = showErrorMessage(this.form)
      this.toast.warning(errorMessage)
      return
    }
  }
}
