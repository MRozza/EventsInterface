import {Routes} from '@angular/router';
import {BasicComponent} from "./views/layout/basic/basic.component";
import {DashboardComponent} from "./views/dashboard/dashboard.component";
import {Error404Component} from "./views/layout/error-404/error-404.component";
import {RegistrationComponent} from "./views/registration/registration.component";
import {MobileVerificationComponent} from "./views/mobile-verification/mobile-verification.component";
import {LoginComponent} from "./views/login/login.component";
import {AccountSettingsInfoComponent} from "./views/account-settings/account-settings-info/account-settings-info.component";
import {AccountSettingsChangePasswordComponent} from "./views/account-settings/account-settings-change-password/account-settings-change-password.component";
import {AccountSettingsNotificationsComponent} from "./views/account-settings/account-settings-notifications/account-settings-notifications.component";
import {MyTicketsUpcomingComponent} from "./views/my-tickets/my-tickets-upcoming/my-tickets-upcoming.component";
import {TicketsPastComponent} from "./views/my-tickets/tickets-past/tickets-past.component";
import {MyEventDraftComponent} from "./views/my-events/my-event-draft/my-event-draft.component";
import {MyEventsPastComponent} from "./views/my-events/my-events-past/my-events-past.component";
import {MyEventsGoingComponent} from "./views/my-events/my-events-going/my-events-going.component";
import {DashboardLayoutComponent} from "./views/layout/dashboard-layout/dashboard-layout.component";
import {UpcomingEventsComponent} from "./views/events/upcoming-events/upcoming-events.component";
import {CreateEvent1Component} from "./views/events/create-event-1/create-event-1.component";
import {CreateEvent2Component} from "./views/events/create-event-2/create-event-2.component";
import {CreateEvent3Component} from "./views/events/create-event-3/create-event-3.component";
import {CreateEvent4Component} from "./views/events/create-event-4/create-event-4.component";
import {ManageEventComponent} from "./views/layout/manage-event/manage-event.component";
import {EventInfoComponent} from "./views/manage/event-info/event-info.component";
import {EventDesignComponent} from "./views/manage/event-design/event-design.component";
import {UpdateEventComponent} from "./views/manage/update-event/update-event.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {ReportsComponent} from "./views/manage/reports/reports.component";
import {ViewEventComponent} from "./views/events/view-event/view-event.component";


export const ROUTES: Routes = [
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: '', component: BasicComponent,
    children: [
      {path: 'register', component: RegistrationComponent},
      {path: 'account-settings/profile-info', component: AccountSettingsInfoComponent, canActivate: [AuthGuardService]},
      {path: 'account-settings/change-password', component: AccountSettingsChangePasswordComponent},
      {path: 'account-settings/notification', component: AccountSettingsNotificationsComponent, canActivate: [AuthGuardService]},
      {path: 'my-tickets/upcoming', component: MyTicketsUpcomingComponent, canActivate: [AuthGuardService]},
      {path: 'my-tickets/past', component: TicketsPastComponent, canActivate: [AuthGuardService]},
      {path: 'my-events/draft', component: MyEventDraftComponent, canActivate: [AuthGuardService]},
      {path: 'my-events/past', component: MyEventsPastComponent, canActivate: [AuthGuardService]},
      {path: 'my-events/going', component: MyEventsGoingComponent, canActivate: [AuthGuardService]},
      {path: 'verification/:id', component: MobileVerificationComponent},
      {path: 'login', component: LoginComponent}
    ]
  },
  {
    path: '', component: DashboardLayoutComponent,
    children: [
      {path: 'dashboard', component: DashboardComponent},
      {path: 'events/upcoming', component: UpcomingEventsComponent},
      {path: 'events/create-1/:id', component: CreateEvent1Component, canActivate: [AuthGuardService]},
      {path: 'events/create-1', component: CreateEvent1Component, canActivate: [AuthGuardService]},
      {path: 'events/create-2/:id', component: CreateEvent2Component, canActivate: [AuthGuardService]},
      {path: 'events/create-3/:id', component: CreateEvent3Component, canActivate: [AuthGuardService]},
      {path: 'events/create-3/:ticketId', component: CreateEvent3Component, canActivate: [AuthGuardService]},
      {path: 'events/create-4/:id', component: CreateEvent4Component, canActivate: [AuthGuardService]},

    ]
  },
  {
    path: '', component: ManageEventComponent,
    children: [
      {path: 'manage/event/:id', component: UpdateEventComponent, canActivate: [AuthGuardService]},
      {path: 'manage/reports/:id', component: ReportsComponent, canActivate: [AuthGuardService]},
      {path: 'event/view/:id', component: ViewEventComponent, canActivate: [AuthGuardService]},
    ]
  },
  {
    path: '**', component: Error404Component
  }
];
