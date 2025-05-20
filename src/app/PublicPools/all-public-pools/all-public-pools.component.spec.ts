import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPublicPoolsComponent } from './all-public-pools.component';

describe('AllPublicPoolsComponent', () => {
  let component: AllPublicPoolsComponent;
  let fixture: ComponentFixture<AllPublicPoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPublicPoolsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllPublicPoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
