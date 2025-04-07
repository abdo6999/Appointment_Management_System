import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  doctorForm!: FormGroup;

  constructor(private fb: FormBuilder,private adminService: AdminService) { }

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      specialization: ['', [Validators.required]],
      bio: ['', [Validators.required]],
      experience_years: ['', [Validators.required, Validators.min(0)]],
      clinic_address: ['', [Validators.required]],
      consultation_fee: ['', [Validators.required, Validators.min(0)]],
    });
  }
  onSubmit(): void {
    const d = this.doctorForm.value
    const doctorProfileData  = {
      specialization: d.specialization,
      bio: d.bio,
      experience_years: d.experience_years,
      clinic_address: d.clinic_address,
      consultation_fee: d.consultation_fee
    }
    const doctorAccountData  = {
      username: d.username,
      name:d.name,
      email: d.email,
      password_hash: d.password,
      phone: d.phone,
      role: 'doctor'
    }
    if (this.doctorForm.valid) {
      this.adminService.createDoctor(doctorAccountData, doctorProfileData).subscribe({
        next: (response) => {
          console.log('Doctor account and profile created successfully:', response);
        },
        error: (error) => {
          console.error('Error creating doctor:', error);
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
