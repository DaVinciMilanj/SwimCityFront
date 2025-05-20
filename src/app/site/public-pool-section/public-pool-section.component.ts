import { Component } from '@angular/core';
import { poolsEntity } from '../../model/pool-model/pools.model';
import { HttpService } from '../../service/http.service';
import { CommonModule } from '@angular/common';
import { GenderPipe } from '../../pip/gender.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-public-pool-section',
  standalone: true,
  imports: [CommonModule , GenderPipe , RouterLink],
  templateUrl: './public-pool-section.component.html',
  styleUrl: './public-pool-section.component.css'
})
export class PublicPoolSectionComponent {

  allPools : poolsEntity[];
    constructor(private _service:HttpService){}
   
    ngOnInit(): void {
      this._service.getPublicPools().subscribe((response)=>{
        if(response.length > 4){
          this.allPools=response.slice(0,4)
        }else{
          this.allPools = response
        }
        
        
        
        
        
      })
    }

}
