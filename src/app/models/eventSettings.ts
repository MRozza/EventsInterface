export class EventSettings {
  constructor(public Id: string,
              public IsPrivate: boolean,
              public EventCapacity: Number,
              public OrganizerTitle: string,
              public OrganizerDescription: string,
              public OrganizerTwitter: string,
              public OrganizerInstagram: string,
              public OrganizerEmail: string,
              public Terms: string) {
  }
}
