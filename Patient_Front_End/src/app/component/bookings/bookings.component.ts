import { Component, model, ViewChild } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter, provideNativeDateAdapter} from '@angular/material/core';
import { MatCalendar, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { AppointmentService } from '../../services/appointment/appointment.service';

const MY_DATE_FORMATS = {
  parse: {
      dateInput: {month: 'long', year: 'numeric', day: 'numeric'}
  },
  display: {
      dateInput: {month: 'long', year: 'numeric', day: 'numeric'},
      monthLabel: {month: 'long', year: 'numeric'},
      monthYearLabel: {month: 'long', year: 'numeric'},
      dateA11yLabel: {month: 'long', year: 'numeric', day: 'numeric'},
      monthYearA11yLabel: {month: 'long', year: 'numeric'}
  }
}


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.scss',
  providers:[provideNativeDateAdapter(MY_DATE_FORMATS)]
})

export class BookingsComponent {
  @ViewChild(MatCalendar) calendar!: MatCalendar<Date>;
  filteredAppointments: any[] = [];
  guestId : any = JSON.parse(localStorage.getItem('guestData')!).uuid

  selected = model<Date | null>(null);
  patientId = localStorage.getItem('uuid')
  highlightedDates: string[] = [];
  appointments: any[] = []
  dateClass = (d: Date): string => {
    const dateString = d.toISOString().split('T')[0];
    return this.highlightedDates.includes(dateString) ? 'highlight-date' : '';
  };
  onDateChange(date: Date | null) {
    this.selected.set(date);
    const formatted = date?.toISOString().split('T')[0];
    this.filteredAppointments = this.appointments.filter(
      appt => appt.appointment_date === formatted
    );
  }
  constructor(private appointment:AppointmentService){}
  ngOnInit() {
    if (this.patientId) {
      this.appointment.getAllAppointmentByPatientId(this.patientId).subscribe({
        next: (res) => {
          this.appointments = res;
          this.filteredAppointments = res
          this.highlightedDates = res.map((appt: any) => appt.appointment_date);
          this.calendar.updateTodaysDate()
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    if(this.guestId) {
      this.appointment.getAllAppointmentByGuest_idId(this.guestId).subscribe({
        next: (res) => {
          this.appointments = res;
          this.filteredAppointments = res
          this.highlightedDates = res.map((appt: any) => appt.appointment_date);
          this.calendar.updateTodaysDate()
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
}

