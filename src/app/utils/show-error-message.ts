import { FormGroup } from "@angular/forms";
import { translateFormField } from "./translate-form-fields";

export function showErrorMessage(form: FormGroup): string {
  let errorMessage: string = "";

  Object.keys(form.controls).forEach((field) => {
    const control = form.get(field);
    const translatedField = translateFormField(field);
    if (control && control.invalid && control.errors) {
      if (control.errors["required"]) {
        errorMessage = `O campo ${translatedField} é inválido!`;
      } else if (control.errors["email"]) {
        errorMessage = `O endereço de e-mail não é válido.`;
      } else if (control.errors["minlength"]) {
        const minLength = control.errors["minlength"].requiredLength;
        errorMessage = `O campo ${translatedField} deve possuir no mínimo ${minLength} caracteres.`;
      }
    }
    return errorMessage;
  });
  return errorMessage;
}
