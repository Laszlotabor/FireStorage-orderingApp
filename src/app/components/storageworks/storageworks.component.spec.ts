import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageworksComponent } from './storageworks.component';

describe('StorageworksComponent', () => {
  let component: StorageworksComponent;
  let fixture: ComponentFixture<StorageworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageworksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StorageworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
