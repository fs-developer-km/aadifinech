import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, Observable, BehaviorSubject } from 'rxjs';
import { catchError, of } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface User {
  id: string;
  name: string;
  mobile: string;
  role: 'user' | 'admin' | 'employee' | 'partner';
  accountStatus: string;
  signupDate?: Date;
  lastLoginDate?: Date;
  lastLoginTime?: string;
  loginCount?: number;
  
  department?: string;
  designation?: string;
  employeeCode?: string;
  reportingTo?: string;
  allowedPermissions?: string[];
  
  companyName?: string;
  businessType?: string;
  commissionType?: string;
  commissionValue?: number;
  gstNumber?: string;
  address?: string;
}

interface Lead {
  leadName: string;
  leadPhone: string;
  submittedDate: string;
  submittedTime: string;
  leadSource: string;
  notes: string;
}

interface UserLoginRecord {
  _id:string;
  userId: string;
  userName: string;
  userPhone: string;
  userEmail: string;
  email: string;
  signupDate: string;
  lastLoginDate: string;
  lastLoginTime: string;
  loginCount: number;
  accountStatus: 'Active' | 'Inactive' | 'Suspended';
  location: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  msg: string;
  token: string;
  user: User;
}

export interface OTPResponse {
  success: boolean;
  msg: string;
  data?: {
    mobile: string;
    expiresIn: number;
    verificationToken?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userKey = 'loggedInUser';
  private apiUrl = `${environment.apiBaseUrl}/auth`;

  //  private apiUrl = 'http://localhost:5000/api/auth';
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();


  constructor(private http: HttpClient) {
      this.loadUserFromStorage();
  }


    private loadUserFromStorage(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.userSubject.next(user);
      } catch (error) {
        console.error('Error parsing user from localStorage', error);
      }
    }
  }

 

 

  clearToken(): void {
    localStorage.removeItem('token');
  }

    // ==================== HTTP HEADERS ====================

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }


  // `https://localhost:5000/api/auth/forget-password/send-otp`,

    // ==================== FORGOT PASSWORD - SEND OTP ====================

  sendOTP(data: { mobile: string }): Observable<OTPResponse> {
    return this.http.post<OTPResponse>(
      `https://api.aadifintech.com/api/auth/forget-password/send-otp`, 
      data
    );
  }

  // ==================== FORGOT PASSWORD - VERIFY OTP ====================

  verifyOTP(data: { mobile: string; otp: string }): Observable<OTPResponse> {
    return this.http.post<OTPResponse>(
      `https://api.aadifintech.com/api/auth/forget-password/verify-otp`, 
      data
    );
  }

  // ==================== FORGOT PASSWORD - RESET PASSWORD ====================

  resetPassword(data: { 
    mobile: string; 
    verificationToken: string; 
    newPassword: string 
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `https://api.aadifintech.com/api/auth/forget-password/reset`, 
      data
    );
  }






 

  // ================================================================
  // 🔵 SIGNUP
  // ================================================================
  signup(data: { name: string; mobile: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, data).pipe(
      map((res) => {
        if (res.success) {
          this.saveToken(res.token);
          this.saveRole(res.user.role);    
          // console.log('Signup responserrrrrr:', res);
  // 🔥 store role
          this.setUser(res.user);             // 🔥 store user
        }
        return res;
      })
    );
    
  }

  // ================================================================
  // 🔵 LOGIN
  // ================================================================
  login(data: { mobile: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      map((res) => {
        if (res.success) {
          this.saveToken(res.token);
          this.saveRole(res.user.role);       // 🔥 store role
          this.setUser(res.user);             // 🔥 store user
        }
        return res;
      })
    );
  }

  // ================================================================
  // 🔥 TOKEN FUNCTIONS
  // ================================================================
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // ================================================================
  // 🔥 ROLE HANDLING — (NEW ADDED)
  // ================================================================
  saveRole(role: string) {
    localStorage.setItem('role', role);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
    
  }

  hasRole(role: string): boolean {
    return this.getRole() === role;
  }

  // ================================================================
  // 🔥 USER STORAGE
  // ================================================================
  setUser(user: any) {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser() {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null;
  }

  clearUser() {
    localStorage.removeItem(this.userKey);
  }

  isLoggedInn(): boolean {
    return !!localStorage.getItem(this.userKey);
  }

  // ================================================================
  // 🔥 GET ALL USERS LIST (already in your code)
  // ================================================================
  private apiUrls = 'https://api.aadifintech.com/api/auth/getUser';
  // private apiUrls = 'http://localhost:5000/api/auth/getUser';



  getUserLoginRecords(): Observable<UserLoginRecord[]> {

      const token = localStorage.getItem('token'); // jaha tum token save karte ho

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
    
  return this.http.get<any>(this.apiUrls, { headers }).pipe(
      map((res) => {
        if (res.success && res.users) {
          return res.users.map((u: any, i: number) => ({
            userId: u._id,
            userName: u.name || 'N/A',
            userPhone: u.mobile || 'N/A',
            userEmail: u.email || 'N/A/sads',
            designation: u.designation || 'N/A/sads',
            signupDate: new Date(u.signupDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
            lastLoginDate: u.lastLoginDate ? new Date(u.lastLoginDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A',
            lastLoginTime: u.lastLoginTime || 'N/A',
            loginCount: u.loginCount || 0,
            accountStatus: u.accountStatus || 'Active',
            location: u.location || 'N/A',
            role: u.role || 'R/N/A'
          }));
        }
        return [];
      })
    );
  }

  // ================================================================
  // 🔥 LEAD APIs
  // ================================================================
  private baseUrlss = 'https://api.aadifintech.com/api/lead/list';

  getLeads(): Observable<Lead[]> {
  const token = localStorage.getItem('token'); // jaha tum token save karte ho

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.get<Lead[]>(this.baseUrlss, { headers });
}


  // getLeads(): Observable<Lead[]> {
  //   return this.http.get<Lead[]>(this.baseUrlss);
  // }

  addLead(data: { name: string; phone: string }): Observable<any> {
    return this.http.post(this.baseUrlss, data);
  }

  // ================================================================
  // 🔥 VISITOR TRACKING
  // ================================================================
  private apiUrlcookies = 'https://api.aadifintech.com/api/visitor/create';
  private apiUrlget = 'https://api.aadifintech.com/api/visitor';

  trackVisitor(page: string) {
    const body = { pageVisited: page };
    return this.http.post(this.apiUrlcookies, body).pipe(
      catchError((err) => {
        console.error('Visitor tracking failed:', err);
        return of({ success: false, message: 'Error tracking visitor' });
      })
    );
  }

  getAllCookies() {
    const url = 'https://api.aadifintech.com/api/visitor/all';
    return this.http.get<any>(url).pipe(
      map((res: any) => {
        console.log("Cookies API Response:", res);
        return res;
      }),
      catchError(err => {
        console.error('Error fetching cookies:', err);
        return of({ success: false, cookies: [] });
      })
    );
  }

  deleteCookie(cookieId: string) {
    return this.http.delete(`${this.apiUrlget}/${cookieId}`).pipe(
      catchError(err => {
        console.error('Error deleting cookie:', err);
        return of({ success: false });
      })
    );
  }

  clearAllCookies() {
    return this.http.delete(`${this.apiUrlget}/clear`).pipe(
      catchError(err => {
        console.error('Error clearing all cookies:', err);
        return of({ success: false });
      })
    );
  }

  // ================================================================
  // END OF SERVICE
  // ================================================================
}
