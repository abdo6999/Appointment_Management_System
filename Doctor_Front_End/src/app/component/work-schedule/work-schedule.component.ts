import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {  Router } from '@angular/router';
import { WorkScheduleService } from '../../services/work-schedule/work-schedule.service';

@Component({
  selector: 'app-work-schedule',
  templateUrl: './work-schedule.component.html',
  styleUrls: ['./work-schedule.component.scss']
})
export class WorkScheduleComponent implements OnInit {
  scheduleForm: FormGroup;
  weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  durations = ['15m', '30m', '45m', '60m'];
  hours = Array.from({ length: 12 }, (_, i) => i + 1); // Generates [1, 2, ..., 12]
  doctorId!: string;
  isScheduleExist = false;
  isEditMode = false;


  constructor(
    private fb: FormBuilder,
    private workScheduleService: WorkScheduleService,
    private router: Router
  ) {
    this.scheduleForm = this.fb.group({
      id: [''],
      work_days: [[]],
      startHour: ['8'],
      startPeriod: ['AM'],
      endHour: ['5'],
      endPeriod: ['PM'],
      appointment_duration: ['30m'],
      cost: ['']
    });
  }

  ngOnInit(): void {
    this.doctorId = localStorage.getItem('uuid') || '';
    if (this.doctorId) {
      this.workScheduleService.getByDoctorId(this.doctorId).subscribe({
        next:(response) => {
          console.log(response)
          if (response && response.id) {
            this.isScheduleExist = true;
            this.populateForm(response);
          } else {
            this.isScheduleExist = false;
            console.log('No existing schedule found, ready to create a new one.');
          }
        },
        error:(error) => {
          console.error('Error fetching work schedule:', error);
        }
      });
    }

  }

  populateForm(schedule: any): void {
    const startHour = parseInt(schedule.start_time.split(':')[0], 10);
    const startPeriod = schedule.start_time.includes('AM') ? 'AM' : 'PM';
    const endHour = parseInt(schedule.end_time.split(':')[0], 10);
    const endPeriod = schedule.end_time.includes('AM') ? 'AM' : 'PM';

    // Convert appointment_duration from time format to number of minutes
    const [hours, minutes] = schedule.appointment_duration.split(':').map(Number);
    const appointmentDuration = hours * 60 + minutes + 'm'; // Convert duration to minutes


    this.scheduleForm.patchValue({
      id: schedule.id,
      work_days: schedule.work_days,
      startHour: startHour,
      startPeriod: startPeriod,
      endHour: endHour,
      endPeriod: endPeriod,
      appointment_duration: appointmentDuration, // Store as minutes
      cost: schedule.cost
    });
  }

  onDayChange(day: string, event: any): void {
    const workDays = this.scheduleForm.controls['work_days'].value || [];
    if (event.target.checked) {
      workDays.push(day);
    } else {
      const index = workDays.indexOf(day);
      if (index > -1) {
        workDays.splice(index, 1);
      }
    }
    this.scheduleForm.controls['work_days'].setValue(workDays);
  }

  editSchedule(): void {
    this.isEditMode = true;
  }

  saveSchedule(): void {
    const startTime = `${this.padToTwoDigits(this.scheduleForm.value.startHour)}:00${this.scheduleForm.value.startPeriod}`;
    const endTime = `${this.padToTwoDigits(this.scheduleForm.value.endHour)}:00${this.scheduleForm.value.endPeriod}`;

    const scheduleData = {
      start_time: startTime,
      end_time: endTime,
      doctor_id: this.doctorId,
      work_days:this.scheduleForm.value.work_days,
      appointment_duration:this.scheduleForm.value.appointment_duration
    };

    if (this.isScheduleExist) {
      this.workScheduleService.update(this.scheduleForm.value.id, scheduleData).subscribe({
        next:(response) => {
          console.log('Schedule updated successfully:', response);
          this.router.navigate(['/home']);
        },
        error:(error) => {
          console.error('Error updating schedule:', error);
        }
      });
    } else {
      this.workScheduleService.create(scheduleData).subscribe({
        next:(response) => {
          console.log('Schedule created successfully:', response);
          this.router.navigate(['/home']);
        },
        error:(error) => {
          console.error('Error creating schedule:', error);
        }
      });
    }
  }


  // Helper method to pad hours to 2 digits (e.g., 1 -> 01)
  padToTwoDigits(hour: number): string {
    return hour < 10 ? `0${hour}` : hour.toString();
  }
}
