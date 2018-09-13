import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

declare let jQuery: any;

@Component({
  selector: 'app-side-menu-manage-event',
  templateUrl: './side-menu-manage-event.component.html'
})
export class SideMenuManageEventComponent implements OnInit {

  @Input() eventId: string;
  @Input() isReport: boolean;

  constructor(private router: Router) {
    // this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id)
  }

  ngOnInit() {

  }

  public showManagement(): void {
    if (this.isReport) {
      this.router.navigate(['/manage/event/'+this.eventId]).then();
    } else {
      this.hideAll();
      jQuery('.event-settings').css('margin-right', jQuery('.drawer').width() + 'px');
      jQuery('.event-settings').fadeIn();
    }
  }

  public showDesignManagement(): void {
    if (this.isReport) {
      this.router.navigate(['/manage/event/'+this.eventId]).then();
    } else {
      this.hideAll();
      jQuery('.design-event').css('margin-right', jQuery('.drawer').width() + 'px');
      jQuery('.design-event').fadeIn();
    }
  }

  public showEventInfo(): void {
    if (this.isReport) {
      this.router.navigate(['/manage/event/'+this.eventId]).then();

    } else {
      this.hideAll();
      jQuery('.event-info').css('margin-right', jQuery('.drawer').width() + 'px');
      jQuery('.event-info').fadeIn();
    }
  }

  public showEventTickets(): void {
    if (this.isReport) {
      this.router.navigate(['/manage/event/'+this.eventId]).then();

    } else {
      this.hideAll();
      jQuery('.event-tickets').css('margin-right', jQuery('.drawer').width() + 'px');
      jQuery('.event-tickets').fadeIn();
    }
  }

  public showEventSponsors(): void {
    if (this.isReport) {
      this.router.navigate(['/manage/event/'+this.eventId]).then();

    } else {
      this.hideAll();
      jQuery('.event-sponsors').css('margin-right', jQuery('.drawer').width() + 'px');
      jQuery('.event-sponsors').fadeIn();
    }
  }

  public showOrders(): void {
    if (this.isReport) {
      this.router.navigate(['/manage/event/'+this.eventId]).then();

    } else {
      this.hideAll();
      jQuery('.event-manage').css('margin-right', jQuery('.drawer').width() + 'px');
      jQuery('.event-manage').fadeIn();
    }
  }

  public hideAll(): void {
    jQuery('.event-settings').hide();
    jQuery('.design-event').hide();
    jQuery('.event-info').hide();
    jQuery('.event-tickets').hide();
    jQuery('.event-sponsors').hide();
    jQuery('.event-manage').hide();
  }

}
