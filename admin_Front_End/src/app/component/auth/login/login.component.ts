import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!:FormGroup
  showPassword = false // password show




  constructor(private fb:FormBuilder,private authService:AuthService,private router: Router){

  }




  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)
      ]),
    });
  }






  userLogin(){
      if (! this.loginForm.valid) {
        const username = this.loginForm.value.username
        const password = this.loginForm.value.password
        this.authService.signIn(username, password).subscribe({
          next:(response) => {
            this.router.navigate(['/home']);
          },
          error:(error) => {
            alert(error.message)
          }
        })
      }else {
        alert("invalid form inputs")
      }
    }











    // geterr



    get usernameControl(): FormControl {
      return this.loginForm.get('username') as FormControl;
    }



    get passwordControl(): FormControl {
      return this.loginForm.get('password') as FormControl;
    }





}

