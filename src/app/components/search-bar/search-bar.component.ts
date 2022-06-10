import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, filter, map, startWith, switchMap} from 'rxjs/operators';
import {EventService} from '../../services/event-service/event.service';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() searchOutputEvent = new EventEmitter<string>();
  searchControl = new FormControl();
  filteredOptions: Observable<any>;
  events: any;

  constructor(private eventService: EventService) {
  }

  getSearch(event) {
    this.searchOutputEvent.emit(event.target.value);
  }

  ngOnInit(): void {
    this.filteredOptions = this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        startWith(''),
        switchMap(value => value.length >= 3 ? this._filter(value) : [])
      );
  }

  getParamsTypeCity(page: number, size?: number, locationCity?: string, eventType?: string, eventName?: string) {
    const params: any = {
      locationCity,
      eventType: eventType?.toUpperCase(),
      eventName,
      page,
      size
    };
    return params;
  }

  private _filter(value: string) {
    return this.eventService.getEvents(this.getParamsTypeCity(1, 10)).pipe(
      filter(data => !!data),
      map((data) => {
        const test = data.content.filter(x => x.eventName);
        console.log(test[0].eventName);
        return data.content.filter(option => option.eventName.toLowerCase().includes(value));
      })
    );
  }
}
