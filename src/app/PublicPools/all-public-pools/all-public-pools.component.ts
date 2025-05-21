import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { poolsEntity } from '../../model/pool-model/pools.model';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterPoolsPipe } from '../../pip/filter-pools.pipe';
import { GenderPipe } from '../../pip/gender.pipe';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-all-public-pools',
  standalone: true,
  imports: [CommonModule , RouterLink  , RouterModule , FormsModule ,FilterPoolsPipe , GenderPipe],
  templateUrl: './all-public-pools.component.html',
  styleUrl: './all-public-pools.component.css'
})
export class AllPublicPoolsComponent implements OnInit {
  constructor(private _service:HttpService ,private title: Title, private meta: Meta){}
  searchTerm : string = '';
  allPublicPools : poolsEntity[];

  ngOnInit(): void {
    this._service.getPublicPools().subscribe((response)=>{
      this.allPublicPools = response
    })
    this.meta.updateTag({
      name: 'description',
      content: `خزانه‌ای از بهترین مجموعه‌های شنا در مشهد - امکانات، سانس‌ها، آدرس و رزرو آنلاین.`

        
      })
  }


}
