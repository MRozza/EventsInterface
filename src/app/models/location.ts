
export class Location {
  constructor(public Id : Number,
              public Latitude?: string,
              public Longitude?: string,
              public FullAddress? : string,
              public StateName? : string,
              public State? : Number,
              public CityName?: string,
              public CountryName?: string) {
  }
}
