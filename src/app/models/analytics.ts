export interface Analytics {
  visits:Array<AnalyticsVisits>;
  tickets: Array<AnalyticsTickets>;
}
export interface AnalyticsVisits {
 visits:number;
 day:number;
}
export interface AnalyticsTickets {
 tickets:number;
 day:number;
}
