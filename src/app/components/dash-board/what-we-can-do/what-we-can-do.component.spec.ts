import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatWeCanDoComponent } from './what-we-can-do.component';

describe('WhatWeCanDoComponent', () => {
  let component: WhatWeCanDoComponent;
  let fixture: ComponentFixture<WhatWeCanDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatWeCanDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatWeCanDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
