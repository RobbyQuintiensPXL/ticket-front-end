import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {LocationService} from '../../services/location-service/location.service';
import {Location} from '../../entities/location/location';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-filter-location',
  templateUrl: './filter-location.component.html',
  styleUrls: ['./filter-location.component.css']
})
export class FilterLocationComponent implements OnInit {
  @Output() locationOutputEvent = new EventEmitter<any>();
  locations: string[];
  location: string;
  selectedLocation: any;

  constructor(private locationService: LocationService,
              private router: Router) {
  }

  getLocation(event) {
    this.locationOutputEvent.emit(event.target.value);
  }

  listAllLocations(): void {
    this.locationService.getCities().subscribe(location => {
      this.locations = location;
    });
  }

  locationSelected(event: any){
    this.selectedLocation = event.target.value;
    this.router.navigate(['../search'], {queryParams: {city: this.selectedLocation}});
  }


  ngOnInit(): void {
    this.listAllLocations();
  }

}
