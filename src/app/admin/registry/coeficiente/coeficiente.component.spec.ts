import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoeficienteComponent } from './coeficiente.component';

describe('CoeficienteComponent', () => {
  let component: CoeficienteComponent;
  let fixture: ComponentFixture<CoeficienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoeficienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoeficienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
