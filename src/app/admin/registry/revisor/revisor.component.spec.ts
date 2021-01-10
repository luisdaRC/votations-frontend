import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisorComponent } from './revisor.component';

describe('RevisorComponent', () => {
  let component: RevisorComponent;
  let fixture: ComponentFixture<RevisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
