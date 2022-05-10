import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeHomeComponent } from './office-home.component';

describe('OfficeHomeComponent', () => {
  let component: OfficeHomeComponent;
  let fixture: ComponentFixture<OfficeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficeHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
