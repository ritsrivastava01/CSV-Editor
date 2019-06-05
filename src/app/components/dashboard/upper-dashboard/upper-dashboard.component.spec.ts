import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpperDashboardComponent } from './upper-dashboard.component';

describe('UpperDashboardComponent', () => {
  let component: UpperDashboardComponent;
  let fixture: ComponentFixture<UpperDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpperDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpperDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
