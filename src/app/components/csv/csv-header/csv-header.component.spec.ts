import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvHeaderComponent } from './csv-header.component';

describe('CsvHeaderComponent', () => {
  let component: CsvHeaderComponent;
  let fixture: ComponentFixture<CsvHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsvHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
