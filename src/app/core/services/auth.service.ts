import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { catchError, of } from 'rxjs';

export interface User {
  id: string;
  name: string;
  mobile: string;
  role: 'user' | 'admin' | 'employee' | 'partner';
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
}

export interface AuthResponse {
  success: boolean;
  msg: string;
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userKey = 'loggedInUser';
  private apiUrl = `${environment.apiBaseUrl}/auth`;

  constructor(private http: HttpClient) {}

  // ================================================================
  // 🔵 SIGNUP
  // ================================================================
  signup(data: { name: string; mobile: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, data);
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
  private apiUrls = 'https://aadifintech-backend.onrender.com/api/auth/getUser';

  getUserLoginRecords(): Observable<UserLoginRecord[]> {
    return this.http.get<any>(this.apiUrls).pipe(
      map((res) => {
        if (res.success && res.users) {
          return res.users.map((u: any, i: number) => ({
            userId: `#USR-${String(i + 1).padStart(3, '0')}`,
            userName: u.name || 'N/A',
            userPhone: u.mobile || 'N/A',
            userEmail: u.userEmail || 'N/A',
            signupDate: new Date(u.signupDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
            lastLoginDate: u.lastLoginDate ? new Date(u.lastLoginDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A',
            lastLoginTime: u.lastLoginTime || 'N/A',
            loginCount: u.loginCount || 0,
            accountStatus: u.accountStatus || 'Active',
            location: u.location || 'N/A'
          }));
        }
        return [];
      })
    );
  }

  // ================================================================
  // 🔥 LEAD APIs
  // ================================================================
  private baseUrlss = 'https://aadifintech-backend.onrender.com/api/lead/list';

  getLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(this.baseUrlss);
  }

  addLead(data: { name: string; phone: string }): Observable<any> {
    return this.http.post(this.baseUrlss, data);
  }

  // ================================================================
  // 🔥 VISITOR TRACKING
  // ================================================================
  private apiUrlcookies = 'https://aadifintech-backend.onrender.com/api/visitor/create';
  private apiUrlget = 'https://aadifintech-backend.onrender.com/api/visitor';

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
    const url = 'https://aadifintech-backend.onrender.com/api/visitor/all';
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
