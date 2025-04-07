import { Component, OnInit } from '@angular/core';
import { AppointmentsService } from '../../services/appointments/appointments.service';

@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './doctor-appointments.component.html',
  styleUrls: ['./doctor-appointments.component.scss']
})
export class DoctorAppointmentsComponent implements OnInit {

  appointments: any[] = [];

  constructor(private appointmentService: AppointmentsService) {}

  ngOnInit(): void {
      this.appointmentService.getAppointmentsForDoctor().subscribe({
        next: (data) => {
          this.appointments = data
          console.log(data)
        },
        error: (err) => console.error('Failed to load appointments:', err)
    })
  }

  updateStatus(appointment: any) {
    console.log(appointment)
    this.appointmentService.updateAppointment(appointment.id, appointment.status).subscribe({
      next: () => console.log('Status updated successfully.'),
      error: (err) => console.error('Error updating status:', err)
    });
  }
}
