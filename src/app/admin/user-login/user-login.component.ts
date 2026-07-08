import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { interval, Subscription } from 'rxjs';
import { PageTrackerService } from '../../core/services/page-tracker.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface UserLoginRecord {
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  signupDate: string;
  lastLoginDate: string;
  lastLoginTime: string;
  loginCount: number;
  accountStatus: 'Active' | 'Inactive' | 'Suspended';
  location: string;
  role: 'user' | 'admin' | 'employee' | 'partner';
}

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit, OnDestroy {
  
  userLoginData: UserLoginRecord[] = [];
  searchQuery: string = '';
  selectedRole: string = 'all';
  loading = true;
  refreshSub!: Subscription;

  // Pagination
  currentPage: number = 1;
  usersPerPage: number = 10;

  // Delete Modal
  showDeleteModal = false;
  userToDelete: { id: string; name: string } | null = null;
  deletingUserId: string | null = null;

  // Toast
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  // Scroll
  private isDragging = false;
  private startX = 0;
  private scrollLeft = 0;

  // API URLs
  // private deleteUserUrl = 'https://api.aadifintech.com/api/auth/delete-user';
  private deleteUserUrl = 'https://api.aadifintech.com/api/auth/delete-user';

  

  constructor(
    private userService: AuthService,
    private visitorDataService: PageTrackerService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.initTableScroll();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  /**
   * Load user data from backend with proper role mapping
   */
  loadUserData(showLoader = true): void {
    if (showLoader) this.loading = true;
    
    this.userService.getUserLoginRecords().subscribe({
      next: (data: any[]) => {
        console.log("🔍 Raw Backend Data:", data);
        
        // Transform and normalize backend data
        this.userLoginData = data.map(user => {
          // ✅ Proper role extraction - try multiple field names
          const role = user.role || user.userRole || user.type || 'user';
          
          // ✅ Proper userId extraction - try _id first, then userId
          const userId = user._id || user.userId || user.id || 'N/A';
          
          const transformedUser = {
            userId: userId,
            userName: user.userName || user.name || user.username || 'Unknown',
            userPhone: user.userPhone || user.phone || user.phoneNumber || 'N/A',
            userEmail: user.userEmail || user.email || '',
            signupDate: this.formatDate(user.signupDate || user.createdAt || user.registeredAt),
            lastLoginDate: this.formatDate(user.lastLoginDate || user.lastLogin) || 'Never',
            lastLoginTime: user.lastLoginTime || user.lastLoginTimeOnly || '-',
            loginCount: user.loginCount || user.totalLogins || 0,
            accountStatus: this.normalizeStatus(user.accountStatus || user.status),
            location: user.location || user.city || 'Unknown',
            role: this.normalizeRole(role)
          };
          
          console.log(`👤 User: ${transformedUser.userName}, Role: ${role} → ${transformedUser.role}, ID: ${userId}`);
          return transformedUser;
        });
        
        this.visitorDataService.updateTotalUsers(this.userLoginData.length);
        console.log('✅ Transformed User Data:', this.userLoginData);
        console.log('📊 Role Distribution:', {
          admin: this.getRoleCount('admin'),
          employee: this.getRoleCount('employee'),
          partner: this.getRoleCount('partner'),
          user: this.getRoleCount('user')
        });
        
        this.loading = false;
      },
      error: (err) => {
        console.error('❌ Error loading user data:', err);
        this.loading = false;
        this.showToastMessage('Failed to load user data', 'error');
      }
    });
  }

  /**
   * Format date to DD/MM/YYYY
   */
  formatDate(date: any): string {
    if (!date) return 'N/A';
    
    try {
      const d = new Date(date);
      if (isNaN(d.getTime())) return 'N/A';
      
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      
      return `${day}/${month}/${year}`;
    } catch (error) {
      return 'N/A';
    }
  }

  /**
   * Normalize role to ensure valid type
   */
  normalizeRole(role: any): 'user' | 'admin' | 'employee' | 'partner' {
    if (!role) {
      console.log('⚠️ No role provided, defaulting to user');
      return 'user';
    }
    
    const normalizedRole = String(role).toLowerCase().trim();
    console.log(`🔄 Normalizing role: "${role}" → "${normalizedRole}"`);
    
    const validRoles: Array<'user' | 'admin' | 'employee' | 'partner'> = 
      ['user', 'admin', 'employee', 'partner'];
    
    if (validRoles.includes(normalizedRole as any)) {
      return normalizedRole as 'user' | 'admin' | 'employee' | 'partner';
    }
    
    console.log(`⚠️ Invalid role "${role}", defaulting to user`);
    return 'user';
  }

  /**
   * Normalize account status
   */
  normalizeStatus(status: any): 'Active' | 'Inactive' | 'Suspended' {
    if (!status) return 'Active';
    
    const normalizedStatus = String(status).toLowerCase().trim();
    
    if (normalizedStatus === 'active') return 'Active';
    if (normalizedStatus === 'inactive') return 'Inactive';
    if (normalizedStatus === 'suspended') return 'Suspended';
    
    return 'Active';
  }

  /**
   * Filter users by role
   */
  filterByRole(role: string): void {
    this.selectedRole = role;
    this.currentPage = 1;
    console.log(`🔍 Filtering by role: ${role}`);
  }

  /**
   * Get count of users by role
   */
  getRoleCount(role: string): number {
    return this.userLoginData.filter(user => user.role === role).length;
  }

  /**
   * Get count of active users today
   */
  getActiveUsers(): number {
    const today = new Date();
    const todayStr = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
    
    return this.userLoginData.filter(user => 
      user.lastLoginDate === todayStr && user.accountStatus === 'Active'
    ).length;
  }

  /**
   * Filter users based on role and search query
   */
  filterUsers(): UserLoginRecord[] {
    let filtered = this.userLoginData;

    // Role filter
    if (this.selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === this.selectedRole);
    }

    // Search filter
    if (this.searchQuery && this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(user =>
        user.userName.toLowerCase().includes(query) ||
        user.userEmail.toLowerCase().includes(query) ||
        user.userPhone.includes(query) ||
        user.userId.toLowerCase().includes(query)
      );
    }

    return filtered;
  }

  /**
   * Get paginated users for current page
   */
  getPaginatedUsers(): UserLoginRecord[] {
    const filtered = this.filterUsers();
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;
    return filtered.slice(startIndex, endIndex);
  }

  /**
   * Get total number of pages
   */
  getTotalPages(): number {
    const total = Math.ceil(this.filterUsers().length / this.usersPerPage);
    return total > 0 ? total : 1;
  }

  /**
   * Change to specific page
   */
  changePage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  /**
   * Go to next page
   */
  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
    }
  }

  /**
   * Go to previous page
   */
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  /**
   * Get array of page numbers for pagination
   */
  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  /**
   * Open delete confirmation modal
   */
  openDeleteModal(userId: string, userName: string): void {
    console.log(`🗑️ Opening delete modal for userId: ${userId}, userName: ${userName}`);
    this.userToDelete = { id: userId, name: userName };
    this.showDeleteModal = true;
  }

  /**
   * Close delete confirmation modal
   */
  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.userToDelete = null;
  }

  /**
   * Confirm and execute user deletion
   */
  confirmDelete(): void {
    if (!this.userToDelete) return;

    const userId = this.userToDelete.id;
    console.log(`🗑️ Attempting to delete user with ID: ${userId}`);
    
    this.deletingUserId = userId;
    this.closeDeleteModal();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('❌ No authentication token found');
      this.deletingUserId = null;
      this.showToastMessage('Authentication token not found', 'error');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const deleteUrl = `${this.deleteUserUrl}/${userId}`;
    
    console.log(`📡 DELETE Request to: ${deleteUrl}`);

    this.http.delete(deleteUrl, { headers }).subscribe({
      next: (res: any) => {
        console.log('✅ User deleted successfully:', res);
        
        // Remove deleted user from list
        this.userLoginData = this.userLoginData.filter(user => user.userId !== userId);
        this.deletingUserId = null;
        this.showToastMessage('User deleted successfully!', 'success');
        
        // Adjust page if current page is empty
        if (this.getPaginatedUsers().length === 0 && this.currentPage > 1) {
          this.currentPage--;
        }

        // Update total users count
        this.visitorDataService.updateTotalUsers(this.userLoginData.length);
      },
      error: (err) => {
        console.error('❌ Error deleting user:', err);
        console.error('Error details:', {
          status: err.status,
          message: err.message,
          error: err.error
        });
        
        this.deletingUserId = null;
        
        if (err.status === 403) {
          this.showToastMessage('Only admins can delete users!', 'error');
        } else if (err.status === 404) {
          this.showToastMessage('User not found. ID might be incorrect.', 'error');
        } else if (err.status === 401) {
          this.showToastMessage('Unauthorized access', 'error');
        } else {
          this.showToastMessage('Failed to delete user', 'error');
        }
      }
    });
  }

  /**
   * Show toast notification message
   */
  showToastMessage(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  /**
   * Manual refresh triggered by user
   */
  manualRefresh(): void {
    if (this.loading) return;
    this.loadUserData(true);
    setTimeout(() => {
      this.showToastMessage('Data refreshed successfully!', 'success');
    }, 500);
  }

  /**
   * Get CSS class for role badge
   */
  getRoleBadgeClass(role: string): string {
    return `role-badge-${role}`;
  }

  /**
   * Get icon class for role
   */
  getRoleIcon(role: string): string {
    const icons: Record<string, string> = {
      'admin': 'fas fa-user-shield',
      'employee': 'fas fa-user-tie',
      'partner': 'fas fa-handshake',
      'user': 'fas fa-user'
    };
    return icons[role] || 'fas fa-user';
  }

  /**
   * Get CSS class for status badge
   */
  getStatusBadgeClass(status: string): string {
    const classes: Record<string, string> = {
      'Active': 'badge-active',
      'Inactive': 'badge-inactive',
      'Suspended': 'badge-suspended'
    };
    return classes[status] || '';
  }

  /**
   * Get icon class for status
   */
  getStatusIcon(status: string): string {
    const icons: Record<string, string> = {
      'Active': 'fas fa-check-circle',
      'Inactive': 'fas fa-clock',
      'Suspended': 'fas fa-ban'
    };
    return icons[status] || 'fas fa-question-circle';
  }

  /**
   * Initialize table scroll functionality
   */
  initTableScroll(): void {
    setTimeout(() => {
      const tableScroll = document.querySelector('.table-scroll') as HTMLElement;
      
      if (!tableScroll) return;

      // Mouse drag scroll for desktop
      tableScroll.addEventListener('mousedown', (e: MouseEvent) => {
        this.isDragging = true;
        this.startX = e.pageX - tableScroll.offsetLeft;
        this.scrollLeft = tableScroll.scrollLeft;
        tableScroll.style.cursor = 'grabbing';
      });

      tableScroll.addEventListener('mouseleave', () => {
        this.isDragging = false;
        tableScroll.style.cursor = 'grab';
      });

      tableScroll.addEventListener('mouseup', () => {
        this.isDragging = false;
        tableScroll.style.cursor = 'grab';
      });

      tableScroll.addEventListener('mousemove', (e: MouseEvent) => {
        if (!this.isDragging) return;
        e.preventDefault();
        const x = e.pageX - tableScroll.offsetLeft;
        const walk = (x - this.startX) * 2;
        tableScroll.scrollLeft = this.scrollLeft - walk;
      });

      // Touch scroll for mobile devices
      let touchStartX = 0;
      let touchScrollLeft = 0;

      tableScroll.addEventListener('touchstart', (e: TouchEvent) => {
        touchStartX = e.touches[0].pageX - tableScroll.offsetLeft;
        touchScrollLeft = tableScroll.scrollLeft;
      });

      tableScroll.addEventListener('touchmove', (e: TouchEvent) => {
        const x = e.touches[0].pageX - tableScroll.offsetLeft;
        const walk = (x - touchStartX) * 2;
        tableScroll.scrollLeft = touchScrollLeft - walk;
      });
    }, 100);
  }



  // ===== EDIT MODAL STATE (class properties me add karo) =====
showEditModal = false;
loadingEditDetails = false;
savingEdit = false;
changePassword = false;
editUserId: string | null = null;
editUserRole: string = '';

editForm: any = {
  name: '',
  mobile: '',
  accountStatus: 'Active',
  department: '',
  designation: '',
  employeeCode: '',
  companyName: '',
  businessType: '',
  commissionType: '',
  commissionValue: null,
  gstNumber: '',
  address: '',
  newPassword: '',
  confirmPassword: ''
};

private userProfileUrl = 'https://api.aadifintech.com/api/auth/user/profile';
private updateUserUrl = 'https://api.aadifintech.com/api/auth/update-user';

// ===== EDIT MODAL METHODS (class me add karo) =====

openEditModal(userId: string): void {
  this.loadingEditDetails = true;
  this.showEditModal = true;
  this.changePassword = false;
  this.editUserId = userId;

  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  this.http.get<{ success: boolean; data: any }>(`${this.userProfileUrl}/${userId}`, { headers })
    .subscribe({
      next: (res) => {
        if (res.success && res.data) {
          const u = res.data;
          this.editUserRole = u.role || 'user';
          this.editForm = {
            name: u.name || '',
            mobile: u.mobile || '',
            accountStatus: u.accountStatus || 'Active',
            department: u.department || '',
            designation: u.designation || '',
            employeeCode: u.employeeCode || '',
            companyName: u.companyName || '',
            businessType: u.businessType || '',
            commissionType: u.commissionType || '',
            commissionValue: u.commissionValue || null,
            gstNumber: u.gstNumber || '',
            address: u.address || '',
            newPassword: '',
            confirmPassword: ''
          };
        }
        this.loadingEditDetails = false;
      },
      error: (err) => {
        console.error('Error loading user details:', err);
        this.loadingEditDetails = false;
        this.showEditModal = false;
        this.showToastMessage('Failed to load user details', 'error');
      }
    });
}

closeEditModal(): void {
  this.showEditModal = false;
  this.editUserId = null;
  this.editUserRole = '';
  this.changePassword = false;
}

toggleChangePassword(): void {
  this.changePassword = !this.changePassword;
  if (!this.changePassword) {
    this.editForm.newPassword = '';
    this.editForm.confirmPassword = '';
  }
}

saveEditUser(): void {
  if (!this.editUserId) return;

  if (this.changePassword) {
    if (!this.editForm.newPassword || this.editForm.newPassword.length < 6) {
      this.showToastMessage('Password must be at least 6 characters', 'error');
      return;
    }
    if (this.editForm.newPassword !== this.editForm.confirmPassword) {
      this.showToastMessage('Passwords do not match', 'error');
      return;
    }
  }

  this.savingEdit = true;
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  const payload: any = {
    name: this.editForm.name,
    mobile: this.editForm.mobile,
    accountStatus: this.editForm.accountStatus
  };

  if (this.editUserRole === 'employee') {
    payload.department = this.editForm.department;
    payload.designation = this.editForm.designation;
    payload.employeeCode = this.editForm.employeeCode;
  }

  if (this.editUserRole === 'partner') {
    payload.companyName = this.editForm.companyName;
    payload.businessType = this.editForm.businessType;
    payload.commissionType = this.editForm.commissionType;
    payload.commissionValue = this.editForm.commissionValue;
    payload.gstNumber = this.editForm.gstNumber;
    payload.address = this.editForm.address;
  }

  if (this.changePassword) {
    payload.newPassword = this.editForm.newPassword;
  }

  this.http.put(`${this.updateUserUrl}/${this.editUserId}`, payload, { headers })
    .subscribe({
      next: () => {
        this.savingEdit = false;
        this.showToastMessage('User updated successfully!', 'success');
        this.closeEditModal();
        this.loadUserData(false);
      },
      error: (err) => {
        console.error('Error updating user:', err);
        this.savingEdit = false;
        this.showToastMessage(err.error?.msg || 'Failed to update user', 'error');
      }
    });
}



}