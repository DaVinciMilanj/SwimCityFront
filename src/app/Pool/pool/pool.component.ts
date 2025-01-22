import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { response } from 'express';
import { poolsEntity } from '../../model/pool-model/pools.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterPoolsPipe } from '../../pip/filter-pools.pipe';


@Component({
  selector: 'app-pool',
  standalone: true,
  imports: [CommonModule , RouterLink  , RouterModule , FormsModule , FilterPoolsPipe],
  templateUrl: './pool.component.html',
  styleUrl: './pool.component.css'
})
export class PoolComponent implements OnInit {
  searchTerm : string = '';
  allPools : poolsEntity[];
  constructor(private _service:HttpService){}
 
  ngOnInit(): void {
    this._service.getPools().subscribe((response)=>{
      
      this.allPools = response
      
      
      
      
    })
  }


}
