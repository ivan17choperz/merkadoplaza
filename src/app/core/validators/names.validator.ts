import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null; // Si está vacío, lo maneja Validators.required
    }

    const errors: ValidationErrors = {};

    // Longitud mínima: 3 caracteres
    if (value.length < 2) {
      errors['tooShort'] = true;
    }

    // Solo letras, espacios y tildes (Unicode)
    const nameRegex = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/;

    if (!nameRegex.test(value)) {
      errors['invalidCharacters'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  };
}
