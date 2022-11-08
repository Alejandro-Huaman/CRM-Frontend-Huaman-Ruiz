/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InitheaderComponent } from './initheader.component';

describe('InitheaderComponent', () => {
  let component: InitheaderComponent;
  let fixture: ComponentFixture<InitheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
