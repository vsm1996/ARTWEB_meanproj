import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LPageComponent } from './l-page.component';

describe('LPageComponent', () => {
  let component: LPageComponent;
  let fixture: ComponentFixture<LPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
