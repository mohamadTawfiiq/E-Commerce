import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { ActivatedRoute } from '@angular/router';
import { Icatdetails } from '../../core/interfaces/icatdetails';

@Component({
  selector: 'app-cat-details',
  standalone: true,
  imports: [],
  templateUrl: './cat-details.component.html',
  styleUrl: './cat-details.component.scss'
})
export class CatDetailsComponent implements OnInit {

  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _ActivatedRoute = inject(ActivatedRoute)

  idOf_category : string = ""
  catDetails: Icatdetails = {} as Icatdetails;


  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next:(p)=>{
        this.idOf_category = p.get(`id`) !
        
        console.log(this.idOf_category );


        this._CategoriesService.getSpecificCategory(this.idOf_category).subscribe({
          next:(res)=>{
            console.log(res.data);
            this.catDetails = res.data
            
          }
        })

      }
    })
  }


}
