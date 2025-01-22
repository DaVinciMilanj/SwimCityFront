import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPrivateClassComponent } from './request-private-class.component';

describe('RequestPrivateClassComponent', () => {
  let component: RequestPrivateClassComponent;
  let fixture: ComponentFixture<RequestPrivateClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestPrivateClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestPrivateClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
