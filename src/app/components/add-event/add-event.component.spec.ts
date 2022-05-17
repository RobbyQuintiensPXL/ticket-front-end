import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddEventComponent} from './add-event.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {EventTypeService} from '../../services/event-type/event-type.service';
import {HttpClientModule} from '@angular/common/http';
import {defer} from 'rxjs';

describe('AddEventComponent', () => {
  let component: AddEventComponent;
  let fixture: ComponentFixture<AddEventComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEventComponent],
      providers: [EventTypeService],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('form'));
    element = de.nativeElement;
  });
/*
  it('should create', () => {
    expect(component).toBeTruthy();
  });*/

  it('should call the submit method', () => {
    fixture.detectChanges();
    spyOn(component, 'submit');
    element = fixture.debugElement.query(By.css('button')).nativeElement;
    element.click();
    expect(component.submit).toHaveBeenCalledTimes(0);
  });
});
