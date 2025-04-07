import { Component } from '@angular/core';
import { DoctorService } from '../../services/doctor/doctor.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss'
})
export class DoctorsComponent {
  doctors: any[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit() {
    this.doctorService.getAllDoctors().subscribe({
      next: (data) => this.doctors = data,
      error: (err) => console.error('Failed to fetch doctors', err)
    });
  }

  getInitial(name: string) {
    console.log(name)
    return name ? name.charAt(0).toUpperCase() : '?';
  }
}
