import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvLayoutComponent } from './csv-layout.component';

describe('CsvLayoutComponent', () => {
  let component: CsvLayoutComponent;
  let fixture: ComponentFixture<CsvLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
