import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewartComponent2 } from './viewart.component';

describe('ViewartComponent', () => {
  let component: ViewartComponent2;
  let fixture: ComponentFixture<ViewartComponent2>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewartComponent2 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewartComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
