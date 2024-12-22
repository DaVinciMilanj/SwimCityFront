import { Component } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { poolsEntity } from '../../model/pool-model/pools.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pool-section',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './pool-section.component.html',
  styleUrl: './pool-section.component.css'
})
export class PoolSectionComponent {
  allPools : poolsEntity[];
  constructor(private _service:HttpService){}
 
  ngOnInit(): void {
    this._service.getPools().subscribe((response)=>{
      if(response.length > 4){
        this.allPools=response.slice(0,4)
      }else{
        this.allPools = response
      }
      
      
      
      
      
    })
  }

}
