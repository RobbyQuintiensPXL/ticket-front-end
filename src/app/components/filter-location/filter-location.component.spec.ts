import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterLocationComponent } from './filter-location.component';
import {LocationService} from '../../services/location-service/location.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

describe('FilterLocationComponent', () => {
  let component: FilterLocationComponent;
  let fixture: ComponentFixture<FilterLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
