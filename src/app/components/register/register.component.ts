import { Component } from "@angular/core";
import { InputComponent } from "../common/input/input.component";
import { ButtonComponent } from "../common/button/button.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { RegisterService } from "../../services/auth/register.service";
import { showErrorMessage } from "../../utils/show-error-message";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: "./register.component.html",
})
export class RegisterComponent {
  constructor(
    private readonly toast: ToastrService,
    private readonly registerService: RegisterService,
  ) {}

  form: FormGroup = new FormGroup({
    name: new FormControl("", {
      validators: [Validators.required],
    }),
    email: new FormControl("", {
      validators: [Validators.email, Validators.required],
    }),
    phone: new FormControl("", {
      validators: [Validators.required],
    }),
    password: new FormControl("", {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    confirm_password: new FormControl("", {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  async onSubmit() {
    if (!this.form.valid) {
      const errorMessage = showErrorMessage(this.form);
      this.toast.warning(errorMessage);
      return;
    }

    const { confirm_password = "", ...user } = {
      ...this.form.value,
      phone: this.form.value.phone.replace(/\D/g, ""),
    };

    if (this.form.value.password !== confirm_password) {
      this.toast.warning("As senhas não coincidem!");
      return;
    }

    try {
      await this.registerService.createUser(user);
      this.registerService.updateCurrentPage(true);
      this.toast.success("Usuário criado com sucesso!");
    } catch (_) {
      this.toast.error("Ocorreu um erro ao criar o usuário!");
    }
  }
}
