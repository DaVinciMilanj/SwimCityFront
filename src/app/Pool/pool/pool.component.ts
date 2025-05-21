import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { response } from 'express';
import { poolsEntity } from '../../model/pool-model/pools.model';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterPoolsPipe } from '../../pip/filter-pools.pipe';
import { GenderPipe } from '../../pip/gender.pipe';
import { PoolsGenderFilterPipe } from '../../pip/pools-gender-filter.pipe';
import { Meta, Title } from '@angular/platform-browser';




@Component({
  selector: 'app-pool',
  standalone: true,
  imports: [CommonModule , RouterLink  , RouterModule , FormsModule ,FilterPoolsPipe , GenderPipe , PoolsGenderFilterPipe ],
  templateUrl: './pool.component.html',  
  styleUrl: './pool.component.css'
})
export class PoolComponent implements OnInit {
  searchTerm : string = '';
  allPools : poolsEntity[];
  selectedGender: string = '';
  constructor(private _service:HttpService ,private title: Title, private meta: Meta){}
 
  ngOnInit(): void {
    this._service.getPools().subscribe((response)=>{
      
      this.allPools = response
      console.log(this.allPools);
      this.title.setTitle('آموزش شنا در بهترین مجموعه');
      this.meta.updateTag({
        name: 'description',
        content: 'آموزش شنا در بهترین مجموعه - امکانات، سانس‌ها، آدرس و رزرو آنلاین.'
      });
      
      
      
      
      
    })
  }
  
  

}
