import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPoolsTickestsComponent } from './public-pools-tickests.component';

describe('PublicPoolsTickestsComponent', () => {
  let component: PublicPoolsTickestsComponent;
  let fixture: ComponentFixture<PublicPoolsTickestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicPoolsTickestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicPoolsTickestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
