import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchTable',
  standalone: true
})
export class SearchTablePipe implements PipeTransform {

  transform(courses: any[], searchText: string): any[] {
    if (!courses || !searchText) {
      return courses;
    }

    const searchLowerCase = searchText.toLowerCase();
    return courses.filter(course =>
      course.teacher.toLowerCase().includes(searchLowerCase) || 
      course.id.toString().includes(searchText)
    );
  }

}
