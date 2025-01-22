import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender',
  standalone: true
})
export class GenderPipe implements PipeTransform {

  transform(value: string): string {
    if (value === 'male') {
      return 'مردانه';
    } else if (value === 'female') {
      return 'زنانه';
    } else {
      return 'نامشخص';
    }
  }

}
