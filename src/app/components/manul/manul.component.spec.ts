import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManulComponent } from './manul.component';

describe('ManulComponent', () => {
  let component: ManulComponent;
  let fixture: ComponentFixture<ManulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManulComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
