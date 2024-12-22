import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function enumValidator<T extends Record<string, string | number>>(enumType: T): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const validValues = Object.values(enumType);
    return validValues.includes(control.value)
      ? null
      : { enum: { validValues, actualValue: control.value } };
  };
}
