import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null; // Si está vacío, que otro validador lo maneje (required)
    }

    const errors: ValidationErrors = {};

    if (value.length < 8 || value.length > 20) {
      errors['invalidLength'] = true; // ✅ Accede con corchetes
    }

    if (!/[A-Z]/.test(value)) {
      errors['noUppercase'] = true;
    }

    if (!/\d/.test(value)) {
      errors['noNumber'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  };
}
