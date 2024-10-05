import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Icategory } from '../../core/interfaces/icategory';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit  {

  private readonly _CategoriesService = inject(CategoriesService)
  private readonly _ToastrService = inject(ToastrService)


  categoriesList!: Icategory[]


  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categoriesList = res.data
      }
    })
  }

  getSpecificCat(id:string):void{
    this._CategoriesService.getSpecificCategory(id).subscribe({
      next:(res)=>{
        console.log(res);
        this._ToastrService.info(`${res.data.name}` , `Specific Category`  , )
        // open(res.data.image)
        
      }
    })
  }

  


}
