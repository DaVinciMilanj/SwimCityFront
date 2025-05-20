import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCommentComponent } from './teacher-comment.component';

describe('TeacherCommentComponent', () => {
  let component: TeacherCommentComponent;
  let fixture: ComponentFixture<TeacherCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherCommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
