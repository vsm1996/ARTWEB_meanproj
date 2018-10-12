import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewartComponent } from './viewart.component';

describe('ViewartComponent', () => {
  let component: ViewartComponent;
  let fixture: ComponentFixture<ViewartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
