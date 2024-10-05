import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {

  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _AuthService = inject(AuthService)
  private readonly _Router = inject(Router)


  step: number = 1
  errMsg:string = '' 

  verifyEmail: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]]
  })

  verifyCode: FormGroup = this._FormBuilder.group({
    resetCode: [null, [Validators.required, Validators.pattern(/^\w{6}$/)]]
  })

  verifyNewPass: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]]
  })


  verify_Email(): void {

    this.verifyNewPass.get('email')?.patchValue( this.verifyEmail.get('email')?.value )


    this._AuthService.set_Verify_Email(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.statusMsg == 'success') {
          this.step = 2
          this.errMsg = ''
        }

      },
      error: (err) => {
        console.log(err.error.message);

        this.errMsg = err.error.message

      }

    })
  }


  verify_Code(): void {
    this._AuthService.set_Verify_Code(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == 'Success') {
          this.step = 3
          this.errMsg = ''

        }

      },
      error: (err) => {
        console.log(err);

        this.errMsg = err.error.message


      }

    })
  }


  verify_NewPass(): void {

    this._AuthService.set_NewPass(this.verifyNewPass.value).subscribe({

      next: (res) => {

        console.log(res);

        localStorage.setItem('userToken' , res.token);

        this._AuthService.saveUserData()

        this._Router.navigate(['/home'])


      },
      error: (err) => {
        console.log(err);
        
        this.errMsg = err.error.message

      }

    })
  }

}
