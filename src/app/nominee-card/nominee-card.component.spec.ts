import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomineeCardComponent } from './nominee-card.component';

describe('NomineeCardComponent', () => {
  let component: NomineeCardComponent;
  let fixture: ComponentFixture<NomineeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NomineeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NomineeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
