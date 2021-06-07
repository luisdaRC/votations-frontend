import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanchaComponent } from './plancha.component';

describe('PlanchaComponent', () => {
  let component: PlanchaComponent;
  let fixture: ComponentFixture<PlanchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanchaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
