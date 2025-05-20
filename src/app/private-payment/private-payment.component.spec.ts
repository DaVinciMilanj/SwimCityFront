import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePaymentComponent } from './private-payment.component';

describe('PrivatePaymentComponent', () => {
  let component: PrivatePaymentComponent;
  let fixture: ComponentFixture<PrivatePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivatePaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrivatePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
