import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRequestPrivateClassComponent } from './send-request-private-class.component';

describe('SendRequestPrivateClassComponent', () => {
  let component: SendRequestPrivateClassComponent;
  let fixture: ComponentFixture<SendRequestPrivateClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendRequestPrivateClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendRequestPrivateClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
