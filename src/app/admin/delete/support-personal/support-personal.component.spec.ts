import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportPersonalComponent } from './support-personal.component';

describe('SupportPersonalComponent', () => {
  let component: SupportPersonalComponent;
  let fixture: ComponentFixture<SupportPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupportPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
