import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnReplacement } from './return-replacement';

describe('ReturnReplacement', () => {
  let component: ReturnReplacement;
  let fixture: ComponentFixture<ReturnReplacement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnReplacement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReturnReplacement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
