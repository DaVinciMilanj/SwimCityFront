import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPrivateClassesComponent } from './user-private-classes.component';

describe('UserPrivateClassesComponent', () => {
  let component: UserPrivateClassesComponent;
  let fixture: ComponentFixture<UserPrivateClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPrivateClassesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserPrivateClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
