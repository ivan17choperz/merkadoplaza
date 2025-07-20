import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function colombianPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null; // Lo maneja Validators.required si es obligatorio
    }

    const errors: ValidationErrors = {};

    // Verifica longitud
    if (value.length !== 10) {
      errors['invalidLength'] = true;
    }

    // Verifica que empiece con 3
    if (!/^3/.test(value)) {
      errors['mustStartWith3'] = true;
    }

    // Verifica que contenga solo números
    if (!/^[0-9]+$/.test(value)) {
      errors['notNumeric'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  };
}
