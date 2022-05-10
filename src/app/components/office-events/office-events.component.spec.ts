import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeEventsComponent } from './office-events.component';

describe('OfficeEventsComponent', () => {
  let component: OfficeEventsComponent;
  let fixture: ComponentFixture<OfficeEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeEventsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
