import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretaryIdentificationComponent } from './secretary-identification.component';

describe('SecretaryIdentificationComponent', () => {
  let component: SecretaryIdentificationComponent;
  let fixture: ComponentFixture<SecretaryIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecretaryIdentificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretaryIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
