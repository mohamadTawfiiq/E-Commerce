import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)

  messageSuccess:boolean = false
  errMessg:string = ""
  isLoading:boolean = false 

  loginForm: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6,}$/)]),

  })


  loginSubmit():void {

    if (this.loginForm.valid) {

      console.log(this.loginForm);
      

      this.isLoading = true

      this._AuthService.setloginForm(this.loginForm.value).subscribe({

        next:(res)=>{

          console.log(res);
          if(res.message == "success"){ 
            this.messageSuccess = true
            setTimeout(()=>{
              
              localStorage.setItem('userToken' , res.token)

              this._AuthService.saveUserData()

              this._Router.navigate(['/home' ])} , 1000) }

          this.isLoading = false

        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);

          this.errMessg= err.error.message

          this.isLoading = false
          
        }
      })


    }else{
      this.loginForm.setErrors({mismatch:true})
      this.loginForm.markAllAsTouched() 
      this.errMessg = 'All Inputs Are Required ...'
      
    }

  }


}
