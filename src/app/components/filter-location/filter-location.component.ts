import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {LocationService} from '../../services/location-service/location.service';
import {Location} from '../../entities/location/location';

@Component({
  selector: 'app-filter-location',
  templateUrl: './filter-location.component.html',
  styleUrls: ['./filter-location.component.css']
})
export class FilterLocationComponent implements OnInit {
  @Output() locationOutput = new EventEmitter<any>();
  locations: Location[];
  location: Location;
  selectedLocation: any;

  constructor(private locationService: LocationService,
              private router: Router) {
  }

  listAllLocations(): void {
    this.locationService.getLocations().subscribe(location => {
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
