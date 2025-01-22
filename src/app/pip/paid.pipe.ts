import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paid',
  standalone: true
})
export class PaidPipe implements PipeTransform {

  transform(value: boolean): string {
    if (value === true) {
      return 'پرداخت شده';
    } else{
      return 'پرداخت نشده';
   
  }
}
}
