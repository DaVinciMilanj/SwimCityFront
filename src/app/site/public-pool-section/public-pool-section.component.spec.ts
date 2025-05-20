import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicPoolSectionComponent } from './public-pool-section.component';

describe('PublicPoolSectionComponent', () => {
  let component: PublicPoolSectionComponent;
  let fixture: ComponentFixture<PublicPoolSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicPoolSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PublicPoolSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
