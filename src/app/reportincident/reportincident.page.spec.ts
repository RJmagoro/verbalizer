import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportincidentPage } from './reportincident.page';

describe('ReportincidentPage', () => {
  let component: ReportincidentPage;
  let fixture: ComponentFixture<ReportincidentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportincidentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportincidentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
