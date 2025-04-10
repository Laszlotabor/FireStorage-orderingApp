import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoragedetailComponent } from './storagedetail.component';

describe('StoragedetailComponent', () => {
  let component: StoragedetailComponent;
  let fixture: ComponentFixture<StoragedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoragedetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoragedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
