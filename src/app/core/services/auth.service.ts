import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { catchError, of } from 'rxjs';

export interface User {
  id: string;
  name: string;
  mobile: string;
  role: 'user' | 'admin';
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

  // Signup API call
  signup(data: { name: string; mobile: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, data);
  }

  // Login API call
  login(data: { mobile: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data);
  }

  // Save JWT token to localStorage
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Logout user
  logout() {
    localStorage.removeItem('token');
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Optional: Get user role from token
  getUserRole(): 'user' | 'admin' | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role;
    } catch (e) {
      return null;
    }
  }



  // get signup api

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



  // lead apis

  private baseUrlss = 'https://aadifintech-backend.onrender.com/api/lead/list'; // ✅ your backend URL

  
  getLeads(): Observable<Lead[]> {
    return this.http.get<Lead[]>(this.baseUrlss);
  }

  addLead(data: { name: string; phone: string }): Observable<any> {
    return this.http.post(this.baseUrlss, data);
  }


   private apiUrlcookies = 'https://aadifintech-backend.onrender.com/api/visitor/create';

   
  trackVisitor(page: string) {
    const body = { pageVisited: page };

    return this.http.post(this.apiUrlcookies, body).pipe(
      catchError((err) => {
        console.error('Visitor tracking failed:', err);
        return of({ success: false, message: 'Error tracking visitor' });
      })
    );
  }

    private apiUrlget = 'https://aadifintech-backend.onrender.com/api/visitor'; // base URL


    
  // ✅ Get all cookies
getAllCookies() {
  const url = 'https://aadifintech-backend.onrender.com/api/visitor/all';
  return this.http.get<any>(url).pipe(
    map((res: any) => {
      console.log("✅ Cookies API Response:", res);
      return res;
    }),
    catchError(err => {
      console.error('❌ Error fetching cookies:', err);
      return of({ success: false, cookies: [] });
    })
  );
}


  // ✅ Delete single cookie
  deleteCookie(cookieId: string) {
    return this.http.delete(`${this.apiUrlget}/${cookieId}`).pipe(
      catchError(err => {
        console.error('Error deleting cookie:', err);
        return of({ success: false });
      })
    );
  }

  // ✅ Clear all cookies
  clearAllCookies() {
    return this.http.delete(`${this.apiUrlget}/clear`).pipe(
      catchError(err => {
        console.error('Error clearing all cookies:', err);
        return of({ success: false });
      })
    );
  }


  // AUTH user for profile setup

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


}
