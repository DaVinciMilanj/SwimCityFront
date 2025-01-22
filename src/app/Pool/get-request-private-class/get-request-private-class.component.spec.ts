import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetRequestPrivateClassComponent } from './get-request-private-class.component';

describe('GetRequestPrivateClassComponent', () => {
  let component: GetRequestPrivateClassComponent;
  let fixture: ComponentFixture<GetRequestPrivateClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetRequestPrivateClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetRequestPrivateClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
