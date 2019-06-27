import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickdialPage } from './quickdial.page';

describe('QuickdialPage', () => {
  let component: QuickdialPage;
  let fixture: ComponentFixture<QuickdialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickdialPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickdialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
