import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposicionComponent } from './proposicion.component';

describe('ProposicionComponent', () => {
  let component: ProposicionComponent;
  let fixture: ComponentFixture<ProposicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
