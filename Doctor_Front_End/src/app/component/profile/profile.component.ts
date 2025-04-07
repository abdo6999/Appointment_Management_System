import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  isEditing: boolean = false;  // Flag to toggle edit mode

  doctor = {
    name: 'Dr. Riyaz Aly',
    specialization: 'Cardiologist',
    bio: 'Experienced Cardiologist with a passion for heart health...',
    contact: '123-456-7890',
    image: '', // Can be a URL to an image or an empty string
  };

  // Toggle between Edit and View mode
  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.doctor.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
