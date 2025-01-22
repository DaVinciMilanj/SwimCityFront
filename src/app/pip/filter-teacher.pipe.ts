import { Pipe, PipeTransform } from '@angular/core';
import { Teacher } from '../model/users/teacher.model';

@Pipe({
  name: 'filterTeacher',
  standalone: true
})
export class FilterTeacherPipe implements PipeTransform {

  transform(teachers : Teacher[] , searchTerm : string): Teacher[] {
    if (!teachers || !searchTerm) {
      return teachers; // اگر ورودی یا داده‌ها موجود نباشند، همان لیست را بر می‌گرداند
    }

    const lowerSearchTerm = searchTerm.toLowerCase(); // عبارت جستجو را به حروف کوچک تبدیل می‌کنیم

    return teachers.filter(teacher => {
      const firstName = teacher.first_name.toLowerCase();
      const lastName = teacher.last_name.toLowerCase();

      // مقایسه جستجو با نام کوچک و نام خانوادگی
      return firstName.startsWith(lowerSearchTerm) || lastName.startsWith(lowerSearchTerm);
    });
  }

}
