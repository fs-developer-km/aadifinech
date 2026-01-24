import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-user-enquiry',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './user-enquiry.component.html',
  styleUrl: './user-enquiry.component.css'
})
export class UserEnquiryComponent {
  leadName: string = '';
  leadPhone: string = '';
  notes: string = '';
  isVisible: boolean = true;
  isLoading: boolean = false; // 👈 Loader control
  message: string = '';
  messageType: 'success' | 'error' | '' = '';
  showSuccessModal = false;

  constructor(private http: HttpClient) {}

  onSubmit(): void {
    if (!this.leadName || !this.leadPhone || this.leadPhone.length !== 10) {
      this.showMessage('Please fill all fields correctly!', 'error');
      return;
    }

    this.isLoading = true;
    this.message = '';

    const apiUrl = 'https://api.aadifintech.com/api/lead/create'; // 🔗 Backend API URL
    // const apiUrl = 'https://aadifintech-backend.onrender.com/api/lead/create'; // 🔗 Backend API URL
    // const apiUrl = 'http://localhost:5000/api/lead/create'; // 🔗 Backend API URL
    const body = { leadName: this.leadName, leadPhone: this.leadPhone , notes: this.notes};

    this.http.post(apiUrl, body).subscribe({
      next: (res: any) => {
        console.log("create body ",body);
        console.log("create res ",res);
        
        this.isLoading = false;
         this.message = 'Enquiry submitted successfully!';
        this.messageType = 'success';
        this.showSuccessModal = true; //
        this.showMessage(
          `Thank you ${this.leadName}! Our team will contact you soon on ${this.leadPhone}.`,
          'success'
        );
        // Close popup after success
        setTimeout(() => this.closePopup(), 2500);
      },
      error: (err) => {
        this.isLoading = false;
         this.isLoading = false;
        this.message = 'Something went wrong. Please try again.';
        this.messageType = 'error';
        this.showMessage('Something went wrong. Please try again later.', 'error');
        console.error('API Error:', err);
      }
    });
  }

  closePopup(): void {
    this.isVisible = false;
    localStorage.setItem('hasSeenWelcomePopup', 'true');
  }

  showMessage(msg: string, type: 'success' | 'error') {
    this.message = msg;
    this.messageType = type;
    setTimeout(() => {
      this.message = '';
      this.messageType = '';
    }, 3000);
  }
  // for success popup 
  closePopups() {
    this.isVisible = false;
  }
  onClose() {
    this.isVisible = false;
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
    this.isVisible = false;
  }
}
