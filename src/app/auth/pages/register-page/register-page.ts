import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe,ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {

  fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm : FormGroup = this.fb.group({
    name : ['', Validators.required, Validators.required],   
    email: ['', [Validators.required, Validators.email]],
    username: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword:['', [Validators.required, Validators.minLength(6)]],
  })

  onSave() {
 this.myForm.markAllAsTouched();
 console.log(this.myForm)
}


}
