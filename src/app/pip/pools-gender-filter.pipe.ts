import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poolsGenderFilter',
  standalone: true
})
export class PoolsGenderFilterPipe implements PipeTransform {
  transform(pools: any[], gender: string): any[] {
    if (!pools || !gender) {
      return pools; // Return all pools if no filter is applied
    }
    return pools.filter(pool => pool.gender === gender);
  }

}
