import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrand } from '../../core/interfaces/ibrand';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  private readonly _BrandsService = inject(BrandsService)

  brandsList!:Ibrand[]

  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.brandsList = res.data
      }
    })
  }

  getSpecificBrand(id:string):void{
    this._BrandsService.getSpecificBrand(id).subscribe({
      next:(res)=>{
        console.log(res.data);
        
      }
    })
  }

}
