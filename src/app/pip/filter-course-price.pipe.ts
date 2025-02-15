import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCoursePrice',
  standalone: true
})
export class FilterCoursePricePipe implements PipeTransform {

  transform(courses: any[], sortOrder: string): any[] {
    if (!courses) return [];
    if (sortOrder === 'cheap') {
      return courses.sort((a, b) => a.price - b.price);  // ارزان ترین
    } else if (sortOrder === 'expensive') {
      return courses.sort((a, b) => b.price - a.price);  // گرانترین
    }
    return courses;
  }

}
