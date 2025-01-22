import { Pipe, PipeTransform } from '@angular/core';
import { poolsEntity } from '../model/pool-model/pools.model';

@Pipe({
  name: 'filterPools',
  standalone: true
})
export class FilterPoolsPipe implements PipeTransform {

  transform(pools: poolsEntity[], searchTerm : string): poolsEntity[] {
    if (!pools || !searchTerm) {
      return pools; 
     }
     const lowerSearchTerm = searchTerm.toLowerCase();
     return pools.filter(pool => {
      const poolName = pool.name.toLowerCase();
  
      return poolName.startsWith(lowerSearchTerm);
    });
  }

}





