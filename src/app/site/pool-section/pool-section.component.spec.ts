import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolSectionComponent } from './pool-section.component';

describe('PoolSectionComponent', () => {
  let component: PoolSectionComponent;
  let fixture: ComponentFixture<PoolSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoolSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoolSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
