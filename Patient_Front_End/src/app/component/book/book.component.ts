import { Component, model } from '@angular/core';
import { provideNativeDateAdapter} from '@angular/material/core';
import { TimeSlotService } from '../../services/time-slot/time-slot.service';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../../services/appointment/appointment.service';

const MY_DATE_FORMATS = {
  parse: {
      dateInput: {month: 'numeric', year: 'numeric', day: 'numeric'}
  },
  display: {
      dateInput: {month: 'numeric', year: 'numeric', day: 'numeric'},
      monthLabel: {month: 'long', year: 'numeric'},
      monthYearLabel: {month: 'long', year: 'numeric'},
      dateA11yLabel: {month: 'long', year: 'numeric', day: 'numeric'},
      monthYearA11yLabel: {month: 'long', year: 'numeric'}
  }
}
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
  providers:[provideNativeDateAdapter(MY_DATE_FORMATS)]
})
export class BookComponent {
  doctorId!: string;
  selected: Date | null = null;
  timeSlots: any[] = [];
  bookedSlotIds: string[] = [];
  selectedSlotId: string | null = null;
  patientId: any = localStorage.getItem('uuid');
  guestId : any = JSON.parse(localStorage.getItem('guestData')!).uuid
  constructor(private route: ActivatedRoute,
    private timeSlotService: TimeSlotService,
    private appointmentService : AppointmentService
  ){
  }

  ngOnInit() {
    this.doctorId = this.route.snapshot.paramMap.get('id')!;

    this.timeSlotService.getAllTimeSlot(this.doctorId).subscribe({
      next: (slots) => this.timeSlots = slots,
      error: (err) => console.error('Error fetching time slots', err)
    });
  }

  onDateChange(): void {
    if (!this.selected || !this.doctorId) return;
    console.log(this.selected)
    const formattedDate = this.formatDate(this.selected);
    this.appointmentService.getBookedSlotIds(formattedDate, this.doctorId).subscribe((ids) => {
      this.bookedSlotIds = ids;
    });
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
  selectSlot(slotId: string): void {
    this.selectedSlotId = slotId;
  }

  isBooked(slotId: string): boolean {
    return this.bookedSlotIds.includes(slotId);
  }

  submitAppointment() {
    if (!this.selected || !this.selectedSlotId || (!this.patientId && !this.guestId)) return;

    const selectedSlot = this.timeSlots.find(slot => slot.id === this.selectedSlotId);
    if (!selectedSlot) return;
    const appointment = {
      appointment_date: this.formatDate(this.selected),
      time_slot_id:this.selectedSlotId,
      doctor_id: this.doctorId,
      patient_id: this.patientId || null,
      guest_id: this.guestId || null,
      start_time: selectedSlot.slot_start_time,
      end_time: selectedSlot.slot_end_time,
      status: 'pending'
    };

    this.appointmentService.createAppointment(appointment).subscribe({
      next: () => {
        this.selectedSlotId = null;
        this.bookedSlotIds.push(selectedSlot.id)
        console.log('Appointment created successfully!');
      },
      error: (err) => {
        console.error('Error creating appointment:', err);
        console.log('Failed to create appointment.');
      }
    });
  }

}
// appointment_date: string;
//     doctor_id: string | null;
//     end_time: string;
//     patient_id: string | null;
//     start_time: string;
//     status: 'pending';
