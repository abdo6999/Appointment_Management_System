import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  registrationForm!:FormGroup
  showPassword = false // password show
  showConfirmPassword = false




  constructor(private fb:FormBuilder,private auth:AuthService,private router:Router){

  }
  getPasswordValidationClasses(pattern: string): string {
    if (!this.passwordControl.touched) return 'd-none'; // Hide until touched
    const regex = new RegExp(pattern);
    return regex.test(this.passwordControl.value || '')
      ? 'd-none' // Hide if validation passes
      : 'fa-circle-xmark text-danger'; // Show if validation fails
  }



  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        this.matchPasswordValidator.bind(this)
      ]),
      name:new FormControl(null, Validators.required),
      recaptcha: new FormControl(null, Validators.required),
    });

    this.registrationForm.get('password')?.valueChanges.subscribe(() => {
      this.registrationForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  matchPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const password = this.registrationForm?.get('password')?.value;
    const confirmPassword = control.value;
    console.log(password)
    return password === confirmPassword ? null : { passwordMismatch: true };
  }



  onCaptchaResolved(token: any): void {
    if (token) {
      this.registrationForm.get('recaptcha')?.setValue(token); // ✅ update value
    } else {
      this.registrationForm.get('recaptcha')?.setErrors({ required: true });
    }
  }


    userRegister(){
      console.log(this.registrationForm)

      if (this.registrationForm.valid) {
        this.auth.createPatient(this.registrationForm.value).subscribe({
          next:()=>{
            this.router.navigate(['home'])
          },
          error:(error)=>{
            console.log(error)
          }
        })
      }else {
        console.log("invalid form inputs")
      }
    }









    // geterr



    get usernameControl(): FormControl {
      return this.registrationForm.get('username') as FormControl;
    }

    get emailControl(): FormControl {
      return this.registrationForm.get('email') as FormControl;
    }

    get passwordControl(): FormControl {
      return this.registrationForm.get('password') as FormControl;
    }

    get confirmPasswordControl(): FormControl {
      return this.registrationForm.get('confirmPassword') as FormControl;
    }
    get nameControl(): FormControl {
      return this.registrationForm.get('name') as FormControl;
    }
    get recaptchaControl(): FormControl {
      return this.registrationForm.get('recaptcha') as FormControl;
    }






}
