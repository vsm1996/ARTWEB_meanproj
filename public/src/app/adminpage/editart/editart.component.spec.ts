import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditartComponent } from './editart.component';

describe('EditartComponent', () => {
  let component: EditartComponent;
  let fixture: ComponentFixture<EditartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
