import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PageTrackerService {

  // 🔹 Total Visitors
  private totalVisitorsSource = new BehaviorSubject<number>(0);
  totalVisitors$ = this.totalVisitorsSource.asObservable();

  // 🔹 Total Users
  private totalUsersSource = new BehaviorSubject<number>(0);
  totalUsers$ = this.totalUsersSource.asObservable();

  // 🔹 Total Leads
  private totalLeadsSource = new BehaviorSubject<number>(0);
  totalLeads$ = this.totalLeadsSource.asObservable();

  constructor(private authService: AuthService) {}

  // ✅ Fetch visitor data
  loadAllVisitors() {
    this.authService.getAllCookies().pipe(
      map((res: any) => {
        let cookiesArray: any[] = [];
        if (Array.isArray(res)) cookiesArray = res;
        else if (res.cookies) cookiesArray = res.cookies;
        else if (res.data) cookiesArray = res.data;
        return cookiesArray.length;
        console.log("responsvve page iser data dahdjasdjasdh",res);
        
      }),
      catchError(err => {
        console.error('❌ Error fetching total visitors:', err);
        return of(0);
      })
    ).subscribe(count => {
      this.totalVisitorsSource.next(count);
    });
  }

  // ✅ Manually update visitors
  updateTotalVisitors(count: number) {
    this.totalVisitorsSource.next(count);
  }

  // ✅ Fetch users (logins)
  loadAllUsers() {
    this.authService.getUserLoginRecords().pipe(
      map((data: any[]) => data.length),
      catchError(err => {
        console.error('❌ Error fetching users:', err);
        return of(0);
      })
    ).subscribe(count => this.totalUsersSource.next(count));
  }

  // ✅ Manual user update
  updateTotalUsers(count: number) {
    this.totalUsersSource.next(count);
  }

  // ✅ Fetch all leads
  loadAllLeads() {
    this.authService.getLeads().pipe(
      map((data: any[]) => data.length),
      catchError(err => {
        console.error('❌ Error fetching leads:', err);
        return of(0);
      })
    ).subscribe(count => this.totalLeadsSource.next(count));
  }

  // ✅ Manual lead update
  updateTotalLeads(count: number) {
    this.totalLeadsSource.next(count);
  }

  // 🔹 Notification + Message streams for Topbar
  private notificationsSource = new BehaviorSubject<any[]>([]);
  notifications$ = this.notificationsSource.asObservable();

  private messagesSource = new BehaviorSubject<any[]>([]);
  messages$ = this.messagesSource.asObservable();

  // ✅ Update notifications
  updateNotifications(notifs: any[]) {
    this.notificationsSource.next(notifs);
  }

  // ✅ Update messages
  updateMessages(msgs: any[]) {
    this.messagesSource.next(msgs);
  }

  // ✅ Add new notification
  addNotification(notification: any) {
    const current = this.notificationsSource.value;
    this.notificationsSource.next([notification, ...current]);
  }

  // ✅ Add new message
  addMessage(message: any) {
    const current = this.messagesSource.value;
    this.messagesSource.next([message, ...current]);
  }

  // 🔥 NEW SECTION → Real-time activity updates for Topbar 🔥
  private newActivitySource = new Subject<any>();
  newActivity$ = this.newActivitySource.asObservable();

  /**
   * Trigger new activity → updates Topbar notification & message badges
   * @param activity object { type: 'lead' | 'login' | 'signup', userName?: string }
   */
  triggerActivity(activity: any) {
    this.newActivitySource.next(activity);

    // Auto add a notification
    this.addNotification({
      title: `New ${activity.type}`,
      description: `${activity.userName || 'User'} ${activity.type} successfully.`,
      time: new Date().toLocaleTimeString()
    });

    // Auto add a message
    this.addMessage({
      from: 'System',
      text: `A new ${activity.type} just happened: ${activity.userName || 'User'}`,
      time: new Date().toLocaleTimeString()
    });
  }
}
