import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatuserPage } from './chatuser.page';

describe('ChatuserPage', () => {
  let component: ChatuserPage;
  let fixture: ComponentFixture<ChatuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatuserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
