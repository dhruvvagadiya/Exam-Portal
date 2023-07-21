import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

const usernameRegex : RegExp = /^[A-Za-z][A-Za-z0-9_]{5,29}$/
const mobileRegex : RegExp = /^[6-9][0-9]{9}$/

export function usernameValidator (): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = usernameRegex.test(control.value);
      return valid ? null : {regex: {value: control.value}};
    };
}

export function mobileValidator (): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const valid = mobileRegex.test(control.value);
        return valid ? null : { mobileReg : {value : control.value}};
    };
}

export const checkPasswords : ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value
    return pass === confirmPass ? null : { passwordMatch: true }
  }