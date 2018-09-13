import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ROUTES} from './app.routes';

import {AppComponent} from './app.component';
import {BasicComponent} from './views/layout/basic/basic.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {Error404Component} from './views/layout/error-404/error-404.component';
import {CallService} from "./services/call.service";
import {SessionService} from "./services/session.service";
import {TranslatePipe, TranslateService, TRANSLATION_PROVIDERS} from "./components/translation";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegistrationComponent} from './views/registration/registration.component';
import {LocalStorageAccessService} from "./services/local-storage-access.service";
import {AuthService} from "./services/auth.service";
import {MobileVerificationComponent} from './views/mobile-verification/mobile-verification.component';
import {ValidatorService} from "./services/validator.service";
import { LoginComponent } from './views/login/login.component';
import { FooterComponent } from './views/footer/footer.component';
import { VerticalTabSettingsComponent } from './views/vertical-tab-settings/vertical-tab-settings.component';
import {AccountSettingsTopTabComponent} from "./views/account-settings/account-settings-top-tab/account-settings-top-tab.component";
import {AccountSettingsChangePasswordComponent} from "./views/account-settings/account-settings-change-password/account-settings-change-password.component";
import {AccountSettingsNotificationsComponent} from "./views/account-settings/account-settings-notifications/account-settings-notifications.component";
import {MyTicketsUpcomingComponent} from "./views/my-tickets/my-tickets-upcoming/my-tickets-upcoming.component";
import {AccountSettingsInfoComponent} from "./views/account-settings/account-settings-info/account-settings-info.component";
import { TicketsTopTabComponent } from './views/my-tickets/tickets-top-tab/tickets-top-tab.component';
import { MyEventDraftComponent } from './views/my-events/my-event-draft/my-event-draft.component';
import { MyEventsGoingComponent } from './views/my-events/my-events-going/my-events-going.component';
import { MyEventsPastComponent } from './views/my-events/my-events-past/my-events-past.component';
import { MyEvetnsTopBarComponent } from './views/my-events/my-evetns-top-bar/my-evetns-top-bar.component';
import { HeaderComponent } from './views/layout/header/header.component';
import { DashboardLayoutComponent } from './views/layout/dashboard-layout/dashboard-layout.component';
import { LocationComponent } from './views/filters/location/location.component';
import { DatesComponent } from './views/filters/dates/dates.component';
import { EventTypesComponent } from './views/filters/event-types/event-types.component';
import { UpcomingEventsComponent } from './views/events/upcoming-events/upcoming-events.component';
import { CreateEvent1Component } from './views/events/create-event-1/create-event-1.component';
import { CreateEvent2Component } from './views/events/create-event-2/create-event-2.component';
import { CreateEvent3Component } from './views/events/create-event-3/create-event-3.component';
import { CreateEvent4Component } from './views/events/create-event-4/create-event-4.component';
import { EventInfoComponent } from './views/manage/event-info/event-info.component';
import { EventDesignComponent } from './views/manage/event-design/event-design.component';
import { EventTicketsComponent } from './views/manage/event-tickets/event-tickets.component';
import { EventSponsorsComponent } from './views/manage/event-sponsors/event-sponsors.component';
import { EventSettingsComponent } from './views/manage/event-settings/event-settings.component';
import { SalesSummaryComponent } from './views/manage/sales-summary/sales-summary.component';
import { LedgerInvoicesComponent } from './views/manage/ledger-invoices/ledger-invoices.component';
import { EntranceListComponent } from './views/manage/entrance-list/entrance-list.component';
import { ManageEventComponent } from './views/layout/manage-event/manage-event.component';
import { SideMenuManageEventComponent } from './views/layout/side-menu-manage-event/side-menu-manage-event.component';
import { UpdateEventComponent } from './views/manage/update-event/update-event.component';
import {SchemaGeneratorService} from "./services/schema-generator.service";
import { AngMapComponent } from './components/ang-map/ang-map.component';
import {AgmCoreModule} from '@agm/core';
import {AuthGuardService} from "./services/auth-guard.service";
import { ImageUploadModule } from "angular2-image-upload";
import {DatePipe} from "@angular/common";
import {SafeHtml} from "./pipes/safeHTML";
import {ColorPickerModule} from "ngx-color-picker";
import { Step1Component } from './views/events/update/step-1/step-1.component';
import { Step2Component } from './views/events/update/step-2/step-2.component';
import { Step3Component } from './views/events/update/step-3/step-3.component';
import { Step4Component } from './views/events/update/step-4/step-4.component';
import {NgxEditorModule} from "ngx-editor";
import { GetTicketContainerComponent } from './views/get-ticket/get-ticket-container/get-ticket-container.component';
import { SelectTicketsComponent } from './views/get-ticket/select-tickets/select-tickets.component';
import { PersonInfoComponent } from './views/get-ticket/person-info/person-info.component';
import { TicketInfoComponent } from './views/get-ticket/ticket-info/ticket-info.component';
import { PaymentInfoComponent } from './views/get-ticket/payment-info/payment-info.component';
import {QuillModule} from "ngx-quill";
import { SearchNameComponent } from './views/filters/search-name/search-name.component';
import { PickDateComponent } from './controls/pick-date/pick-date.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Step5Component} from "./views/events/update/step-5/step-5.component";
import {DataTableModule} from "angular5-data-table";
import {Step3AllComponent} from "./views/events/update/step-3-all/step-3-all.component";
import { EventManageComponent } from './views/manage/event-manage/event-manage.component';
import { ReportsComponent } from './views/manage/reports/reports.component';
import {TicketsPastComponent} from "./views/my-tickets/tickets-past/tickets-past.component";
import {Step6Component} from "./views/events/update/step-6/step-6.component";
import { ViewEventComponent } from './views/events/view-event/view-event.component';
import { OverHeaderComponent } from './views/layout/over-header/over-header.component';
import {Step7Component} from "./views/events/update/step-7/step-7.component";
import {ChartsModule} from "ng2-charts";


@NgModule({
  declarations: [
    TranslatePipe,
    AppComponent,
    BasicComponent,
    DashboardComponent,
    Error404Component,
    RegistrationComponent,
    MobileVerificationComponent,
    LoginComponent,
    FooterComponent,
    AccountSettingsInfoComponent,
    VerticalTabSettingsComponent,
    AccountSettingsTopTabComponent,
    AccountSettingsChangePasswordComponent,
    AccountSettingsNotificationsComponent,
    MyTicketsUpcomingComponent,
    TicketsTopTabComponent,
    MyEventDraftComponent,
    MyEventsGoingComponent,
    MyEventsPastComponent,
    MyEvetnsTopBarComponent,
    HeaderComponent,
    DashboardLayoutComponent,
    LocationComponent,
    DatesComponent,
    EventTypesComponent,
    UpcomingEventsComponent,
    CreateEvent1Component,
    CreateEvent2Component,
    CreateEvent3Component,
    CreateEvent4Component,
    EventInfoComponent,
    EventDesignComponent,
    EventTicketsComponent,
    EventSponsorsComponent,
    EventSettingsComponent,
    SalesSummaryComponent,
    LedgerInvoicesComponent,
    EntranceListComponent,
    ManageEventComponent,
    SideMenuManageEventComponent,
    UpdateEventComponent,
    AngMapComponent,
    SafeHtml,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    Step3AllComponent,
    GetTicketContainerComponent,
    SelectTicketsComponent,
    PersonInfoComponent,
    TicketInfoComponent,
    PaymentInfoComponent,
    SearchNameComponent,
    PickDateComponent,
    EventManageComponent,
    ReportsComponent,
    TicketsPastComponent,
    Step6Component,
    ViewEventComponent,
    OverHeaderComponent,
    Step7Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAGdfrj9xlvFib1aT-8S8oR9TvUtpiCDYE',
      libraries: ['places'],
    }),
    ImageUploadModule.forRoot(),
    ColorPickerModule,
    QuillModule,
    NgxEditorModule,
    BrowserAnimationsModule, // required animations module
    DataTableModule.forRoot(),
    ChartsModule
  ],
  providers: [
    AuthGuardService,
    CallService,
    SessionService,
    TranslateService,
    TRANSLATION_PROVIDERS,
    ValidatorService,
    TranslateService,
    LocalStorageAccessService,
    AuthService,
    SchemaGeneratorService,
    DatePipe
  ],
  bootstrap: [AppComponent],
  exports: [TranslatePipe]
})
export class AppModule {
}
