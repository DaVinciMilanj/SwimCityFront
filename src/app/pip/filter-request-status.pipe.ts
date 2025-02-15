import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRequestStatus',
  standalone: true
})
export class FilterRequestStatusPipe implements PipeTransform {

  transform(requests: any[], filterStatus: string): any[] {
    if (!requests || !filterStatus) {
      return requests;
    }

    return requests.filter(request => {
      if (filterStatus === 'accepted') {
        return request.acceptation === true;
      } else if (filterStatus === 'unaccepted') {
        return request.acceptation === null;
      }else if (filterStatus === 'rejected'){
          return request.acceptation === false;
      }
      return true; // اگر مقدار خاصی انتخاب نشد، همه درخواست‌ها نمایش داده شوند
    });
  }

}
