import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlQuorumComponent } from './control-quorum.component';

describe('ControlQuorumComponent', () => {
  let component: ControlQuorumComponent;
  let fixture: ComponentFixture<ControlQuorumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlQuorumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlQuorumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
