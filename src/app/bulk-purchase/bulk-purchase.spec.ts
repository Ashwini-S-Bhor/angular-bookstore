import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkPurchase } from './bulk-purchase';

describe('BulkPurchase', () => {
  let component: BulkPurchase;
  let fixture: ComponentFixture<BulkPurchase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkPurchase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkPurchase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
