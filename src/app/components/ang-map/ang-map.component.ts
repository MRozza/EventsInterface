import {Component, ElementRef, NgZone, OnInit, ViewChild, Output, EventEmitter, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {} from 'googlemaps';
import {MapsAPILoader} from '@agm/core';

@Component({
  selector: 'app-ang-map',
  templateUrl: './ang-map.component.html',
  styleUrls: ['./ang-map.component.css']
})
export class AngMapComponent implements OnInit {
  @Input() displayOnly = false;
  @Input() hideInputField = false;
  @Input() disableInputField = false;
  @Input() latitude: number;
  @Input() longitude: number;
  public searchControl: FormControl;
  @Input() zoom: number;
  @Output() public onPosChange: EventEmitter<any> = new EventEmitter<any>();
  public encData = {};
  @Input() address: string;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  ngOnInit() {
    // set google maps defaults
    this.latitude = 24.7135517;
    this.longitude = 46.67529569999999;
    this.zoom = 4;

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    //this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.setLocPoints();
          this.zoom = 12;
        });
      });
    });
  }

  setAddress() {
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(this.latitude, this.longitude);
    const request = {
      location: latlng
    };
    geocoder.geocode(request, (results, status) => {       // <<<===removed function keyword and added arrowfunction

      let city = '';
      let state = '';
      let country = '';
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          for (let i = 0; i < results[0].address_components.length; i++) {
            if (results[0].address_components[i].types[0] === 'country') {
              country = results[0].address_components[i].long_name;
            }
            if (results[0].address_components[i].types[0] === 'locality') {
              city = results[0].address_components[i].long_name;
            }
            if (results[0].address_components[i].types[0] === 'administrative_area_level_1') {
              state = results[0].address_components[i].long_name;
            }
          }
          this.encData['latitude'] = this.latitude;
          this.encData['longitude'] = this.longitude;
          this.encData['city'] = city;
          this.encData['state'] = state;
          this.encData['country'] = country;
          this.encData['fullAddress'] = results[0].formatted_address;
          this.address = results[0].formatted_address;
          this.onPosChange.emit(this.encData);
        } else {
          alert('No address available');
        }
      }
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.setLocPoints();
      }, this.errorHandler, {maximumAge: 0, timeout: 5000, enableHighAccuracy: true});
    }
  }

  errorHandler(e: any) {
    console.error(JSON.stringify(e));
  }

  dragEnded(e) {
    this.latitude = e.coords.lat;
    this.longitude = e.coords.lng;
    this.setLocPoints();
  }

  changePos(e) {
    this.latitude = e.coords.lat;
    this.longitude = e.coords.lng;
    this.setLocPoints();
  }

  setLocPoints() {
    this.encData['latitude'] = this.latitude;
    this.encData['longitude'] = this.longitude;
    this.setAddress();
  }
}
