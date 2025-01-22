import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrivateClassComponent } from './create-private-class.component';

describe('CreatePrivateClassComponent', () => {
  let component: CreatePrivateClassComponent;
  let fixture: ComponentFixture<CreatePrivateClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePrivateClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePrivateClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
