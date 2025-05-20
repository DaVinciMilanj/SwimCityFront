import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { poolsEntity } from '../../model/pool-model/pools.model';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterPoolsPipe } from '../../pip/filter-pools.pipe';
import { GenderPipe } from '../../pip/gender.pipe';

@Component({
  selector: 'app-all-public-pools',
  standalone: true,
  imports: [CommonModule , RouterLink  , RouterModule , FormsModule ,FilterPoolsPipe , GenderPipe],
  templateUrl: './all-public-pools.component.html',
  styleUrl: './all-public-pools.component.css'
})
export class AllPublicPoolsComponent implements OnInit {
  constructor(private _service:HttpService){}
  searchTerm : string = '';
  allPublicPools : poolsEntity[];

  ngOnInit(): void {
    this._service.getPublicPools().subscribe((response)=>{
      this.allPublicPools = response
    })
    
  }


}
