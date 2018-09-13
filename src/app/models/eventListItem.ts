export class EventListItem {
  constructor(public Id: string,
              public  CategoryName: string,
              public Title: string,
              public TypeName: string,
              public DateText: string,
              public LowestPrice: string,
              public HighestPrice: string,
              public StartDate: string,
              public EndDate: string,
              public CityName:string) {
  }
}
