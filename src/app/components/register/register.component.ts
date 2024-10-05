import { Component, inject, OnDestroy } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {

  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)


  messageSuccess:boolean = false
  errMessg:string = ""
  isLoading:boolean = false 

  unSubscribeRegist!:Subscription

  registerForm: FormGroup = new FormGroup({

    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

  }, this.confirmPass)

  confirmPass(g: AbstractControl) {
    if (g.get('password')?.value === g.get('rePassword')?.value) {
      return null
    }
    else {
      return { mismatch: true }
    }
  }


  registerSubmit():void {

    if (this.registerForm.valid) {

      console.log(this.registerForm);
      

      this.isLoading = true

      this.unSubscribeRegist = this._AuthService.setRegisterForm(this.registerForm.value).subscribe({

        next:(res)=>{

          console.log(res);
          if(res.message == "success"){ 
            this.messageSuccess = true
            setTimeout(()=>{this._Router.navigate(['/login' ])} , 1000) }

          this.isLoading = false

        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);

          this.errMessg= err.error.message

          this.isLoading = false
          
        }
      })


    }else{
      this.registerForm.setErrors({mismatch:true})
      this.registerForm.markAllAsTouched() 
      this.errMessg = 'All Inputs Are Required ...'
      
    }

  }




  ngOnDestroy(): void {
    this.unSubscribeRegist?.unsubscribe()
  }



}
