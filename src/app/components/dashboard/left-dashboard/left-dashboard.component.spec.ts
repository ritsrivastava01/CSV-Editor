import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftDashboardComponent } from './left-dashboard.component';

describe('LeftDashboardComponent', () => {
  let component: LeftDashboardComponent;
  let fixture: ComponentFixture<LeftDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
