import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoderesComponent } from './poderes.component';

describe('PoderesComponent', () => {
  let component: PoderesComponent;
  let fixture: ComponentFixture<PoderesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoderesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoderesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
