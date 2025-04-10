import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MystoragesComponent } from './mystorages.component';

describe('MystoragesComponent', () => {
  let component: MystoragesComponent;
  let fixture: ComponentFixture<MystoragesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MystoragesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MystoragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
