import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Lead {
  id: number;
  customerName: string;
  status: 'pending' | 'success' | 'failed';
  assignedDate: string;
  value: number;
}

interface Attendance {
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'halfday';
}

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.css'
})
export class EmployeeDashboardComponent {
  employeeName = 'Rajesh Kumar';
  employeeId = 'EMP001';
  
  // Lead Statistics
  totalLeads = 45;
  successLeads = 28;
  pendingLeads = 12;
  failedLeads = 5;
  successRate = ((this.successLeads / this.totalLeads) * 100).toFixed(1);
  
  // Recent Leads
  recentLeads: Lead[] = [
    { id: 1, customerName: 'Amit Sharma', status: 'success', assignedDate: '2024-11-15', value: 50000 },
    { id: 2, customerName: 'Priya Singh', status: 'pending', assignedDate: '2024-11-16', value: 35000 },
    { id: 3, customerName: 'Rahul Verma', status: 'success', assignedDate: '2024-11-14', value: 45000 },
    { id: 4, customerName: 'Sneha Patel', status: 'pending', assignedDate: '2024-11-17', value: 60000 },
    { id: 5, customerName: 'Vikram Reddy', status: 'failed', assignedDate: '2024-11-13', value: 25000 }
  ];
  
  // Attendance Statistics
  currentMonth = 'November 2024';
  totalWorkingDays = 22;
  presentDays = 18;
  absentDays = 2;
  halfDays = 1;
  attendancePercentage = ((this.presentDays / this.totalWorkingDays) * 100).toFixed(1);
  
  // Recent Attendance
  recentAttendance: Attendance[] = [
    { date: '2024-11-18', checkIn: '09:15 AM', checkOut: '06:30 PM', status: 'present' },
    { date: '2024-11-17', checkIn: '09:00 AM', checkOut: '06:15 PM', status: 'present' },
    { date: '2024-11-16', checkIn: '09:30 AM', checkOut: '02:00 PM', status: 'halfday' },
    { date: '2024-11-15', checkIn: '09:10 AM', checkOut: '06:20 PM', status: 'present' },
    { date: '2024-11-14', checkIn: '-', checkOut: '-', status: 'absent' }
  ];
  
  getStatusBadgeClass(status: string): string {
    const classes: { [key: string]: string } = {
      'success': 'status-success',
      'pending': 'status-pending',
      'failed': 'status-failed',
      'present': 'status-success',
      'absent': 'status-failed',
      'halfday': 'status-pending'
    };
    return classes[status] || '';
  }
  
  getStatusText(status: string): string {
    const texts: { [key: string]: string } = {
      'success': 'Success',
      'pending': 'Pending',
      'failed': 'Failed',
      'present': 'Present',
      'absent': 'Absent',
      'halfday': 'Half Day'
    };
    return texts[status] || status;
  }
}