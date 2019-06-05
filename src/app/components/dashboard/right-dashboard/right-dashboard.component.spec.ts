import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightDashboardComponent } from './right-dashboard.component';

describe('RightDashboardComponent', () => {
  let component: RightDashboardComponent;
  let fixture: ComponentFixture<RightDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
