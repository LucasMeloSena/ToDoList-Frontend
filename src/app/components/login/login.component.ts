import { Component, ViewChild } from '@angular/core';
import { ButtonComponent } from '../common/button/button.component';
import { InputComponent } from '../common/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { showErrorMessage } from '../../utils/show-error-message';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private toast: ToastrService) {}

  form: FormGroup = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)]
    })
  })

  onSubmit() {
    if (!this.form.valid) {
      const errorMessage = showErrorMessage(this.form)
      this.toast.warning(errorMessage)
      return
    }
    console.log(this.form.value)
  }
}
