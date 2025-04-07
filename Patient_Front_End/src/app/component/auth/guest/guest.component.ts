import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.scss'
})
export class GuestComponent {
  guestForm!:FormGroup
  constructor(private fb:FormBuilder,private router:Router){}
  ngOnInit(): void {
    this.guestForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
    })
  }

  guestRegister(){
    if(!this.guestForm.valid) return

    const guestData = {
      guest: true,
      uuid: this.generateUUID(),
      email: this.guestForm.value.email
    };

    localStorage.setItem('guestData', JSON.stringify(guestData));
    this.router.navigate(['home'])
  }

  get emailControl(): FormControl {
    return this.guestForm.get('email') as FormControl;
  }

  generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const random = Math.random() * 16 | 0;
      const value = c === 'x' ? random : (random & 0x3 | 0x8);
      return value.toString(16);
    });
  }
}
